import { Controller, Get, Post, Body, Patch, Param, Delete,Render,Res } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { CustomersService } from './../customers/customers.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly customersService: CustomersService
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('list')
  @Render('transaction_list')
  async findAll() {
    const data = await this.transactionsService.findAll();
    return { transactions: data };
  }
  
  @Get('detail/:id')
  @Render('transaction_detail')
  async viewDetail(@Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(+id);
    return { transaction };
  }

  @Get('add')
  @Render('transaction_form')
  async showAdd() {
  const customers = await this.customersService.findAll();
  return { customers };
}

  @Post('add')
async handleAdd(@Body() body, @Res() res) {
  const payload = {
    ...body,
    customer: { id: +body.customerId }
  };
  await this.transactionsService.create(payload);
  return res.redirect('/transaction/list');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Post('delete/:id')
    async remove(@Param('id') id: string, @Res() res) {
    await this.transactionsService.remove(+id);
    return res.redirect('/transaction/list');
  }
}
