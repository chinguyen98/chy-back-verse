import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
