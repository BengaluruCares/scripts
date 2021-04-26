export interface Base<T = {[key: string]: any}> {
  run: (args: T) => Promise<void>;
}
