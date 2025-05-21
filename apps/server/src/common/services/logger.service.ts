/* eslint-disable no-console */
import { LoggerService as LoggerServiceSrc, Injectable } from '@nestjs/common';
import { Transform, TransformCallback } from 'stream';
import { StringDecoder } from 'string_decoder';

const kLast = Symbol('last');
const kDecoder = Symbol('decoder');

class Splitter extends Transform {
  matcher = /\r?\n/;

  overflow?: boolean;

  skipOverflow = false;

  maxLength?: number;

  [kLast] = '';

  [kDecoder] = new StringDecoder('utf8');

  private _lineHandler?: (line: string) => void;

  constructor() {
    super({
      autoDestroy: true,
      readableObjectMode: true,
    });
  }

  addLineHandler(cb: (line: string) => void) {
    this._lineHandler = cb;
  }

  mapper(incoming: string): any {
    this._lineHandler?.(incoming);
  }

  // eslint-disable-next-line no-undef
  _transform(chunk: any, enc: BufferEncoding, cb: TransformCallback) {
    let list: any;
    if (this.overflow) {
      // Line buffer is full. Skip to start of next line.
      const buf = this[kDecoder].write(chunk);
      list = buf.split(this.matcher);

      if (list.length === 1) return cb(); // Line ending not found. Discard entire chunk.

      // Line ending found. Discard trailing fragment of previous line and reset overflow state.
      list.shift();
      this.overflow = false;
    } else {
      this[kLast] += this[kDecoder].write(chunk);
      list = this[kLast].split(this.matcher);
    }

    this[kLast] = list.pop();

    for (let i = 0; i < list.length; i++) {
      try {
        this._push(this.mapper(list[i]));
      } catch (error: any) {
        return cb(error);
      }
    }

    this.overflow = this.maxLength != null && this[kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) {
      cb(new Error('maximum buffer reached'));
      return;
    }

    cb();
  }

  _flush(cb: TransformCallback) {
    // forward any gibberish left in there
    this[kLast] += this[kDecoder].end();

    if (this[kLast]) {
      try {
        this._push(this.mapper(this[kLast]));
      } catch (error: any) {
        return cb(error);
      }
    }

    cb();
  }

  private _push(val?: any) {
    if (val !== undefined) {
      super.push(val);
    }
  }
}

@Injectable()
export class LoggerService implements LoggerServiceSrc {
  private readonly _name?: string;
  private readonly _prefixColor = '\x1b[1;93m';

  private readonly _logsColor = '\x1b[0;33m';

  private _stream?: Splitter;

  private _requests = new Map<string, any>();

  constructor(name?: string) {
    this._name = name;
  }

  get stream(): Splitter {
    if (!this._stream) {
      this._stream = new Splitter();

      this._stream.addLineHandler(this._handleLine.bind(this));
    }
    return this._stream;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this._print(message, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    this._print(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this._print(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this._print(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this._print(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this._print(message, ...optionalParams);
  }

  getPrefix(hostname: string): string {
    return `${this._prefixColor}[${hostname}]  - \x1b[0m `;
  }

  formatDate(date: Date): string {
    let formatted = date
      .toLocaleDateString('en-US')
      .split('/')
      .map(i => i.padStart(2, '0'))
      .join('/');
    formatted += ', ';
    formatted += date.toLocaleTimeString('en-US');

    return `\x1b[0;97m${formatted}\x1b[0m `;
  }

  private _handleLine(line: string) {
    const log = JSON.parse(line);

    let msg = this.getPrefix(this._name || log.hostname || 'server');
    msg += this.formatDate(new Date(log.time));
    msg += '    ';

    let message = '';
    if (log.req) {
      this._requests.set(log.reqId, log.req);
      return;
    } else if (log.res) {
      const req = this._requests.get(log.reqId);
      this._requests.delete(log.reqId);

      const url = req.url?.split('?')[0];

      message += `${req.method} ❱ ${req.host}${req.port ? `:${req.port}` : ''}${url} | Status '${log.res.statusCode}' ⏱ ${log.responseTime}s`;
    } else {
      message += log.msg.charAt(0).toUpperCase() + (log.msg as string).slice(1);
    }

    msg += `${this._logsColor}${message}\x1b[0m`;

    console.log(msg);
  }

  private _print(message: any, ...optionalParams: any[]) {
    if (typeof message !== 'string' && typeof message !== 'number' && typeof message !== 'bigint' && message != null) {
      console.log(message, ...optionalParams);
      return;
    }
    let msg = this.getPrefix('N');

    msg += this.formatDate(new Date());

    msg += `${this._logsColor}${message}\x1b[0m`;

    console.log(msg, ...optionalParams);
  }
}
