type messageType = 'debug' | 'info' | 'error' | 'warn';

export interface ILogger {
  debug: (message: string, ...data: unknown[]) => void;
  info: (message: string, ...data: unknown[]) => void;
  error: (message: string, ...data: unknown[]) => void;
  warning: (message: string, ...data: unknown[]) => void;
}

class Logger implements ILogger {
  public debug(message: string, ...data: unknown[]): void {
    this.emitLogMessage('debug', message, data);
  }
  public info(message: string, ...data: unknown[]): void {
    this.emitLogMessage('info', message, data);
  }
  public error(message: string, ...data: unknown[]): void {
    this.emitLogMessage('error', message, data);
  }
  public warning(message: string, ...data: unknown[]): void {
    this.emitLogMessage('warn', message, data);
  }
  private emitLogMessage(type: messageType, message: string, data: unknown[]) {
    if (data.length === 0) {
      console[type](message);
    } else {
      console[type](message, data);
    }
  }
}

const Log: ILogger = new Logger();
export default Log;
