import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('varchar', {
    default: 'default.svg',
  })
  @Column('varchar')
  description: string;
  @Column('decimal')
  price: number;
  @Column('int')
  inventary: number;
}
