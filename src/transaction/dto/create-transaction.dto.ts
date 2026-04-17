// transaction/dto/create-transaction.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'Nomor invoice wajib ada' })
  @IsString()
  order_number!: string;

  @IsNotEmpty({ message: 'Total harga tidak boleh kosong' })
  @IsNumber({}, { message: 'Harga harus berupa angka' })
  @Min(0, { message: 'Harga tidak boleh negatif' })
  total_price!: number;

  @IsNotEmpty({ message: 'Pelanggan wajib dipilih' })
  // Di form kita mengirimkan ID sebagai angka
  customerId!: number | any;

  @IsOptional()
  userId?: number | any; // Opsional, jika ingin mencatat admin yang melayani
}