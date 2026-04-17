import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TransactionModule } from './transaction/transaction.module';
import { CustomersModule } from './customers/customers.module';
import { User } from './auth/entities/user.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { Customer } from './customers/entities/customer.entity';
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
    CustomersModule,
  ],
})
export class AppModule {}