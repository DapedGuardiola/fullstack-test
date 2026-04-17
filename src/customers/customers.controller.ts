import { Controller, Get, Post, Body, Patch, Param, Delete,  Render, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post() //untuk pengisian awal database
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get('list')
  @Render('customers_list')
  async viewAllCustomers() {
    const customers = await this.customersService.findAll();
    return { customers };
  }
  qd

  @Get('add')
  @Render('customers_form')
  showAdd() {
    return { title: 'Tambah Pelanggan Baru', action: '/customers/add', customer: null };
  }
  
  @Post('add')
  async handleAdd(@Body() body: CreateCustomerDto, @Res() res) {
    await this.customersService.create(body); 
    return res.redirect('/customers/list'); 
  }

  @Get('edit/:id')
  @Render('customers_form')
  async showEdit(@Param('id') id: string) {
  const customer = await this.customersService.findOne(+id);
    return { 
      title: 'Edit Pelanggan', 
      action: `/customers/update/${id}`,
      customer: customer
    };
  }

  @Post('update/:id')
  async update(@Param('id') id: string, @Body() body, @Res() res) {
    await this.customersService.update(+id, body);
    return res.redirect('/customers/list');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Post('delete/:id')
async remove(@Param('id') id: string, @Res() res) {
  await this.customersService.remove(+id);
  return res.redirect('/customers/list');
}
}
