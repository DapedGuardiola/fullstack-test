import { Module } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]),CustomersModule], 
  controllers: [TransactionController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionModule {}
