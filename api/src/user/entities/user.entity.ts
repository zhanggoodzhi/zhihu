import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  nickname: string;

  @Column({
    nullable: true,
  })
  introduction: string;

  @Column({
    nullable: true,
  })
  avatar: string;
}
