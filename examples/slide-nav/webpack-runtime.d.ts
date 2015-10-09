/**
 * Type declarations for Webpack runtime.
 */

interface WebpackRequire {
  (id: string): any;
  ensure(ids: string[], callBack: ( localrequire: (id: string) => any ) => void , module?: string) : void;
  context(path: string, recursive?: boolean) : any;
}

declare var require: WebpackRequire;

declare var process: { env: { NODE_ENV: string } };
