import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity'; // Pastikan path ini benar
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // 1. Logika untuk Seeder (Cari berdasarkan Nomor Telepon)
  async findOneByPhone(phone: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { phone } });
  }

  // 2. Simpan Customer Baru
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  // 3. Ambil Semua Data Customer
  async findAll() {
    return await this.customerRepository.find();
  }

  // 4. Cari Berdasarkan ID (Logika findOne yang sebenarnya)
  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException(`Customer dengan ID ${id} tidak ditemukan`);
    return customer;
  }

  // 5. Update Data
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id); // Validasi apakah ID ada
    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  // 6. Hapus Data
  async remove(id: number) {
    const customer = await this.findOne(id);
    return await this.customerRepository.remove(customer);
  }
}