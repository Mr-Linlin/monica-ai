import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  email: string;

  @Column()
  phone: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: 0, comment: '0:普通会员,1:黄金会员,2:白金会员' })
  level: number;

  @Column({ default: '普通会员' })
  level_name: string;

  @Column({ default: 10 })
  buy_chat_times: number;

  @Column({ default: 0 })
  chat_times: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
