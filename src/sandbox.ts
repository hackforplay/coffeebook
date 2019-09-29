import transpile from './babel-worker';

export class Sandbox {
  static iframeOrigins = [
    'https://hackforplay-sandbox.firebaseapp.com'
    // 'http://localhost:1234'
  ];

  private port?: MessagePort;
  private userFiles?: IFile[] = [];
  private isRunning = false;

  public project = fetchRpgKit2();
  public get entryPoints() {
    return this.project.then(files => {
      return [files.find(file => file.name === 'main.js')].concat(
        this.userFiles || []
      );
    });
  }

  constructor(options?: { userFiles?: IFile[] }) {
    // connect to iframe
    window.addEventListener('message', this.onMessage, { passive: true });
    this.userFiles = options && options.userFiles;
  }

  public async run(userFiles: IFile[]) {
    this.userFiles = userFiles;
    if (this.isRunning) {
      this.reload();
    } else if (this.port) {
      this.isRunning = true;
      this.port.postMessage({
        query: 'entry',
        value: await this.entryPoints
      });
    }
  }

  /**
   * TODO: ??
   */
  private reload() {
    const iframe = document.querySelector('iframe');
    iframe && (iframe.src = iframe.src);
    this.isRunning = false;
  }

  public dispose() {
    // stop connecting to iframe
    window.removeEventListener('message', this.onMessage);
    this.isRunning = false;
    this.port = undefined;
  }

  private onMessage = ((event: MessageEvent) => {
    // Check origin
    if (Sandbox.iframeOrigins.indexOf(event.origin) < 0) return;
    const [port1] = event.ports || [];
    if (!port1) return;

    port1.addEventListener('message', this.onPortMessage, {
      passive: true
    });
    port1.start();
    // Close previours connection
    if (this.port) {
      this.port.removeEventListener('message', this.onPortMessage);
      this.port.close();
    }
    this.port = port1;
    this.isRunning = false;

    if (this.userFiles) {
      this.run(this.userFiles);
    }
  }).bind(this);

  private onPortMessage = (async (event: MessageEvent) => {
    switch (event.data.query) {
      case 'resolve':
        return this.reply(event, await this.resolve(event.data.value));
      case 'fetchText':
        return this.reply(event, await this.fetchText(event.data.value));
      case 'fetchDataURL':
        return this.reply(event, await this.fetchDataURL(event.data.value));
      default:
        console.warn(event);
        break;
    }
  }).bind(this);

  private reply(event: MessageEvent, payload: any) {
    this.port &&
      this.port.postMessage({
        id: event.data.id,
        ...payload
      });
  }

  private async resolve(name: string) {
    if (name.startsWith('https')) {
      const response = await fetch(name);
      return { value: await response.text() };
    }
    let project = await this.project;
    const file = project.find(
      file => file.name === name || file.name === name + '.js'
    );
    return file ? { value: file.code } : { error: `${name} not found` };
  }

  private async fetchText(name: string) {
    if (name.startsWith('https')) {
      const response = await fetch(name);
      return { value: await response.text() };
    }
    let project = await this.project;
    const file = project.find(
      file => file.name === name || file.name === name + '.js'
    );
    console.log(name, file);
    return file ? { value: file.text } : { error: `${name} not found` };
  }

  private async fetchDataURL(name: string) {
    if (name.startsWith('https')) {
      const response = await fetch(name);
      const blob = await response.blob();
      return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          resolve({ value: fileReader.result });
        };
        fileReader.readAsDataURL(blob);
      });
    }
    let project = await this.project;
    const file = project.find(
      file => file.name === name || file.name === name + '.js'
    );

    return file && file.text
      ? { value: `data:,${encodeURIComponent(file.text)}` }
      : { error: `${name} not found` };
  }
}

export interface IFile {
  type: string;
  name: string;
  code: string;
  text?: string;
  _transpileCache?: string;
}

async function fetchRpgKit2() {
  const infoRes = await fetch(
    'https://www.hackforplay.xyz/api/officials/make-rpg-2'
  );
  const info = await infoRes.json();
  const workJsonUrl = info.workJsonUrl;
  if (typeof workJsonUrl !== 'string') {
    console.error(info);
    throw new Error('Invalid info from /officials/make-rpg-2');
  }
  const projectRes = await fetch(workJsonUrl);
  const project = await projectRes.json();
  if (!Array.isArray(project)) {
    console.error(project);
    throw new Error(`Invalid project from ${project}`);
  }
  const files = project.map<Promise<IFile>>(async file => {
    return {
      text: file.composed,
      ...file,
      code: await transpile(file)
    };
  });
  const result = await Promise.all(files);
  return result;
}
