export default class Logger {
  static log(...args: any[]) {
    if (process.env.VITE_ENV === "development") {
      console.log(...args);
    }
  }
}
