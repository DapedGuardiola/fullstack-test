import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service'; // Pastikan diimport

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Middleware untuk membaca input form
  app.useBodyParser('urlencoded', { extended: true });

  // Setting folder views untuk EJS
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // --- BAGIAN SEEDER OTOMATIS ---
  const authService = app.get(AuthService);
  // Kita buat user admin: 'admin' dengan password 'admin123'
  // Gunakan try-catch agar tidak error jika user sudah ada
  try {
    await authService.register('admin', 'admin123');
    console.log('User admin berhasil dibuat atau sudah ada.');
  } catch (e) {
    console.log('User admin sudah tersedia di database.');
  }
  // ------------------------------

  await app.listen(3000);
}
bootstrap();