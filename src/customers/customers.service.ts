import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  async findOneByPhone(phone: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { phone } });
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException(`Customer dengan ID ${id} tidak ditemukan`);
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    return await this.customerRepository.update(id, dto);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return await this.customerRepository.remove(customer);
  }
}