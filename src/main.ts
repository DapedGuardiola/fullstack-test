import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { CustomersService } from './customers/customers.service';
import { TransactionsService } from './transaction/transaction.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const authService = app.get(AuthService);
  const customersService = app.get(CustomersService);
  const transactionsService = app.get(TransactionsService);

  try {
    const rawData = fs.readFileSync(join(__dirname, '..', 'rawdata.json'), 'utf8');
    const seedData = JSON.parse(rawData);
    console.log('File JSON terbaca. Memulai sinkronisasi data...');

    const savedUsers: any[] = [];
    for (const u of seedData.users) {
      let user = await authService.findOneByUsername(u.username); 
      
      if (!user) {
        user = await authService.register(u.username, u.password);
        console.log(`User baru dibuat: ${u.username}`);
      } else {
        console.log(`User sudah ada: ${u.username} (Skip)`);
      }
      savedUsers.push(user);
    }

    const savedCusts:any[] = [];
    for (const c of seedData.customers) {
      // Cek berdasarkan nomor telepon (unik)
      let customer = await customersService.findOneByPhone(c.phone);

      if (!customer) {
        customer = await customersService.create(c);
        console.log(`Data Customer baru dibuat: ${c.name}`);
      } else {
        console.log(`Data Customer sudah ada: ${c.name} (Skip)`);
      }
      savedCusts.push(customer);
    }

    for (const t of seedData.transactions) {
      const existing = await transactionsService.findOneByOrderNumber(t.order_number);
      
      if (!existing) {
        await transactionsService.create({
          order_number: t.order_number,
          total_price: t.total_price,
          user: savedUsers[t.user_idx],
          customer: savedCusts[t.cust_idx]
        });
        console.log(`Transaksi ${t.order_number} berhasil ditambahkan.`);
      }
    }

    console.log('PROSES PENGISIAN DATA SELESAI.');

  } catch (error) {
    console.error('ERROR SAAT PENGISIAN DATA:', error.message);
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               
    forbidNonWhitelisted: true,    
    transform: true,               
  }));

  await app.listen(3000);
}
bootstrap();