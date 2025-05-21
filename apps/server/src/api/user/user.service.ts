import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly _logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  private _createHash(password: string): { passwordSalt: string; passwordHash: string } {
    const passwordSalt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this._getPasswordHash(password, passwordSalt);
    return { passwordSalt, passwordHash };
  }

  private _getPasswordHash(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  }
}
