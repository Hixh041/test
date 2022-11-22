import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  technicianId: number;

  @Column({
    length: 2500
  })
  summary: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  Isworking: boolean;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // createdAt: string;
  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: string;
}