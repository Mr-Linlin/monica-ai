import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Prompt } from './prompt.entity';
import { User } from 'src/users/entities/user.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '', comment: '分类描述' })
  description: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ comment: '用户id' })
  userId: number | string;

  @OneToMany(() => Prompt, (prompt) => prompt.category)
  prompt: Prompt[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
