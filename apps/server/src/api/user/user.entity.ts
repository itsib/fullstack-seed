import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  login!: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column()
  password!: string;

  @Column()
  salt!: string;
}