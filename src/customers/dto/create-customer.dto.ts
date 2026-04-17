import { IsNotEmpty, IsString, IsPhoneNumber, MaxLength,Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nama pelanggan wajib diisi' })
  @IsString()
  @MaxLength(50, { message: 'Nama maksimal 50 karakter' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Nama hanya boleh berisi huruf' })
  name!: string;

  @IsNotEmpty({ message: 'Nomor telepon wajib diisi' })
  @IsString()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon Indonesia tidak valid (gunakan 08...)' })
  phone!: string;
}

import { PartialType } from '@nestjs/mapped-types';
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}