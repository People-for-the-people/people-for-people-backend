import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from '../address.entity/address.entity';

@Entity('ong')
export class OngEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logoUrl: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  nature: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;
}
