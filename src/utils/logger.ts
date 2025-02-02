import { format } from "date-fns";

class Logger {
  private static getTimestamp(): string {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }

  public static info(message: string): void {
    console.log(`[INFO] ${this.getTimestamp()} - ${message}`);
  }

  public static error(message: string): void {
    console.error(`[ERROR] ${this.getTimestamp()} - ${message}`);
  }
}

export default Logger;
