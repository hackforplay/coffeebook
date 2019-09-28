type IdleCallbackHandle = number;

type IdleRequestCallback = (deadline: IdleDeadline) => void;

interface IdleDeadline {
  timeRemaining(): DOMHighResTimeStamp;
  readonly didTimeout: boolean;
}

interface IdleRequestOptions {
  timeout: number;
}

interface Window {
  hoge: number;
  requestIdleCallback(
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ): IdleCallbackHandle;
  cancelIdleCallback(handle: number): void;
}
