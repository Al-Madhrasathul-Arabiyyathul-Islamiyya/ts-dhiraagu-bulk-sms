export type Logger = {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
};
