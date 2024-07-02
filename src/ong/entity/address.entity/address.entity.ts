import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  streetName: string;

  @Column()
  number: string;
}
