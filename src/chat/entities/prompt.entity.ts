import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
@Entity()
export class Prompt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category)
  category: Category;

  @Column({ comment: '提示词名称' })
  name: string;

  @Column({ default: '', comment: '使用方括号[ ]来指定用户输入' })
  content: string;

  @Column({ default: '', comment: 'Prompt回复文本' })
  response: string;

  @Column({ default: 1, comment: '是否为私有Prompt，0表示公有，1表示私有' })
  is_private: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}