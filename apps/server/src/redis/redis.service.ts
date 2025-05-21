import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BehaviorSubject, Subject } from 'rxjs';
import Redis from 'ioredis';

export type RedisStatus = 'wait' | 'reconnecting' | 'connecting' | 'connect' | 'ready' | 'close' | 'end';

@Injectable()
export class RedisService {
  private readonly _logger: Logger;

  private readonly _redis: Redis;

  readonly status: Subject<RedisStatus>;

  constructor(private readonly config: ConfigService) {
    this._logger = new Logger(RedisService.name);

    const host = this.config.get<string>('redis.host')!;
    const port = this.config.get<number>('redis.port')!;
    const password = this.config.get<string>('redis.password')!;

    this._redis = new Redis({
      host,
      port,
      password,
      retryStrategy: (attempts: number) => Math.min(attempts * 200, 2000),
      enableOfflineQueue: true,
    });

    this.status = new BehaviorSubject<RedisStatus>(this._redis.status);

    this._redis.on('wait', this.onWait.bind(this));
    this._redis.on('ready', this.onReady.bind(this));
    this._redis.on('error', this.onError.bind(this));
    this._redis.on('connecting', this.onConnecting.bind(this));
    this._redis.on('reconnecting', this.onReconnecting.bind(this));
    this._redis.on('connect', this.onConnect.bind(this));
    this._redis.on('close', this.onClose.bind(this));
    this._redis.on('end', this.onEnd.bind(this));
  }

  async set(key: string, value: any): Promise<void> {
    return this._redis.set(key, JSON.stringify(value)).then(() => {});
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await this._redis.get(key);

    if (result) {
      return JSON.parse(result) as T;
    }

    return null;
  }

  async remove(key: string): Promise<void> {
    return this._redis.del(key).then(() => {});
  }

  private onWait() {
    this._logger.log('Wait connect command...');
    this.status.next('wait');
  }

  private onConnecting() {
    this._logger.log('Redis connecting...');
    this.status.next('connecting');
  }

  private onReconnecting() {
    this._logger.log('Redis re-connecting...');
    this.status.next('reconnecting');
  }

  private onConnect() {
    this._logger.log('Redis is connect');
    this.status.next('connect');
  }

  private onReady() {
    this._logger.log('Redis is ready');
    this.status.next('ready');
  }

  private onError(error: Error) {
    this._logger.error(error);
  }

  private onEnd() {
    this._logger.log('Connection end');
    this.status.next('end');
  }

  private onClose() {
    this._logger.log('Connection closed');
    this.status.next('close');
  }
}
