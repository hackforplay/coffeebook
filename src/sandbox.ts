export class Sandbox {
  static iframeOrigins = [
    'https://hackforplay-sandbox.firebaseapp.com'
    // 'http://localhost:1234'
  ];

  private port?: MessagePort;
  private entryPoints?: IFile[];
  private isRunning = false;

  constructor(options?: { entryPoints?: IFile[] }) {
    // connect to iframe
    window.addEventListener('message', this.onMessage, { passive: true });
    this.entryPoints = options && options.entryPoints;
  }

  public run(entryPoints: IFile[]) {
    this.entryPoints = entryPoints;
    if (this.isRunning) {
      this.reload();
    } else if (this.port) {
      this.isRunning = true;
      this.port.postMessage({
        query: 'entry',
        value: this.entryPoints
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

    if (this.entryPoints) {
      this.run(this.entryPoints);
    }
  }).bind(this);

  private onPortMessage = ((event: MessageEvent) => {
    console.log('onPortMessage', event);
  }).bind(this);
}

export interface IFile {
  name: string;
  code: string;
}
