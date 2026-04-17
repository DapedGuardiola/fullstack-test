// auth/dto/login.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsString()
  username!: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password!: string;
}

// auth/dto/register.dto.ts (Digunakan saat tambah admin baru)
export class RegisterDto extends LoginDto {
  // Kamu bisa menambahkan field tambahan jika diperlukan, 
  // misal role atau nama lengkap
}