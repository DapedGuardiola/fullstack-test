import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { User } from './auth/entities/user.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { Customer } from './customers/entities/customer.entity';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_sales',
      entities: [User,Transaction,Customer],
      synchronize: true,
    }),
    AuthModule,
    DashboardModule,
    TransactionModule,
  ],
})
export class AppModule {}