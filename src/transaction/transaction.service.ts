import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }

  async create(data: any) {
    const newTransaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(newTransaction);
  }

  async findAll() {
    return this.transactionRepository.find({
      relations: ['user', 'customer'],
      order: { created_at: 'DESC' }
    });
  }

  async filter(query: any) {
    const qb = this.transactionRepository.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .leftJoinAndSelect('transaction.customer', 'customer')
      .orderBy('transaction.created_at', 'DESC');

    if (query.order_number) {
      qb.andWhere('transaction.order_number LIKE :order_number', {
        order_number: `%${query.order_number}%`,
      });
    }

    if (query.customer) {
      qb.andWhere('customer.name LIKE :customer', {
        customer: `%${query.customer}%`,
      });
    }

    return qb.getMany();
  }

  // TAMBAHKAN METHOD DI BAWAH INI:
  async findOneByOrderNumber(order_number: string): Promise<Transaction | null> {
    return this.transactionRepository.findOne({ where: { order_number } });
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['user', 'customer'],
    });
    if (!transaction) throw new NotFoundException(`Transaksi dengan ID ${id} tidak ditemukan`);
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await this.findOne(id);
    await this.transactionRepository.update(id, updateTransactionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);
    return this.transactionRepository.remove(transaction);
  }
}