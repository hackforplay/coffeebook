declare module 'requestidlecallback' {
  export function request(
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ): IdleCallbackHandle;
  export function cancel(handle: IdleCallbackHandle): void;

  export type DOMHighResTimeStamp = number;
  export type IdleCallbackHandle = number;

  export type IdleRequestCallback = (deadline: IdleDeadline) => void;

  export interface IdleDeadline {
    timeRemaining(): DOMHighResTimeStamp;
    readonly didTimeout: boolean;
  }

  export interface IdleRequestOptions {
    timeout: number;
  }

  export interface Window {
    requestIdleCallback(
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ): IdleCallbackHandle;
    cancelIdleCallback(handle: number): void;
  }
}
