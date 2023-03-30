import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
