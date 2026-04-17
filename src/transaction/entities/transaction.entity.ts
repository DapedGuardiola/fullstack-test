import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Customer} from '../../customers/entities/customer.entity';
@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_number: string;

  @Column('int')
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Customer)
  customer: Customer;
}