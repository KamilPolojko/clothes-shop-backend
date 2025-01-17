import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender } from '../types/gender';

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({
    type: 'timestamp with time zone',
    name: 'dateOfBirth',
  })
  dateOfBirth: Date;
}
