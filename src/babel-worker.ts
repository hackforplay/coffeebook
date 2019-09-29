import { TransformOptions } from '@babel/core';

type Resolve = (result: string) => void;
type Reject = (error: Error) => void;
type Request = { id: string; code: string; options: TransformOptions };
type Response = { id: string; code: string; error?: Error };

const defaultOptions: TransformOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 versions'] },
        useBuiltIns: false
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ]
  ]
};

const resolves = new Map<string, Resolve>();
const rejects = new Map<string, Reject>();
const cache = new Map<string, Promise<string>>();

const extensions = ['application/javascript', 'text/javascript'];

export default function transpile(file: any) {
  if (extensions.indexOf(file.type) < 0) {
    return Promise.resolve(''); // トランスパイル対象ではない
  }
  if (file.options && file.options.isTrashed) {
    return Promise.resolve(''); // 削除されている
  }
  if (file._transpileCache) {
    return Promise.resolve(file._transpileCache); // 結果が残っている
  }
  if (file.text.length > 100000) {
    return Promise.resolve(file.text); // 長すぎるのでスキップ
  }

  const worker = getWorker();
  if (!worker) {
    throw new Error('Babel Worker was not initialized');
  }
  const exist = cache.get(file.name);
  if (exist) return exist; // すでにトランスパイルが始まっている

  const promise = new Promise((resolve: Resolve, reject: Reject) => {
    // 後からイベントハンドラでコールできるように関数を保持する
    resolves.set(file.name, resolve);
    rejects.set(file.name, reject);
  });
  // 同じファイルが複数呼ばれた時のために promise をキャッシュする
  cache.set(file.name, promise);
  // トランスパイル開始
  worker.postMessage({
    id: file.name,
    code: file.text,
    options: {
      ...defaultOptions,
      filename: file.name
    }
  } as Request);
  return promise;
}

let worker: Worker | null = null;
function getWorker() {
  if (worker) return worker;
  // Initialize babel worker process
  debugger;
  worker = new Worker(
    '../node_modules/@hackforplay/babel-worker/lib/babel-worker.js'
  );
  worker.onmessage = event => {
    // Result of transpiling
    const { id, code, error } = event.data as Response;
    if (error) {
      // トランスパイルを試みたが, Syntax Error が見つかった
      const reject = rejects.get(id);
      if (!reject) {
        // エラーを伝える関数が登録されていない
        console.error(error);
        throw new Error(`rejects[${id}] is not registered`);
      }
      const babelError = new Error(error.message);
      babelError.name = 'SyntaxError';
      babelError.stack = error.stack;
      reject(babelError);
      return;
    }

    const resolve = resolves.get(id);
    if (!resolve) {
      // 結果を伝える関数が登録されていない
      throw new Error(`resolves[${id}] is not registered`);
    }

    resolve(code); // 結果を返す
    resolves.delete(id);
    rejects.delete(id);
  };
  worker.onerror = event => {
    console.error(event);
    // Babel Error ではなく, 致命的なエラーが発生した
    worker && worker.terminate();
    resolves.clear();
    rejects.clear();
    cache.clear();
    worker = null;
    console.warn('Babel Worker was terminated.');
    throw new Error(event.message);
  };
  return worker;
}
