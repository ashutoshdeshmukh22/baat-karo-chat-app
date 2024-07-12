import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: true, default: null })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column('uuid', { name: 'updated_by', nullable: true, default: null })
  updatedBy: string;
}
