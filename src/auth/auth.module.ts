import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Tambahkan ini
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';     // Tambahkan ini

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Tambahkan ini agar bisa dipakai di main.ts untuk seeder
})
export class AuthModule {}