declare module '*.css' {
  interface CSSModules {
    [className: string]: string;
  }
  var cssModules: CSSModules;
  export default cssModules;
}
