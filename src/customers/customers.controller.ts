import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get('list')
  @Render('customers_list')
  async viewAllCustomers() {
    const customers = await this.customersService.findAll();
    return { customers };
  }

  @Get('add')
  @Render('customers_form')
  showAdd() {
    return { title: 'Tambah Pelanggan Baru', action: '/customers/add', customer: null };
  }

  @Post('add')
  async create(@Body() body: any, @Res() res) {
    const customerDto = plainToInstance(CreateCustomerDto, body);
    const errors = await validate(customerDto);

    if (errors.length > 0) {

      const constraints = errors[0].constraints;
      const message = constraints ? Object.values(constraints)[0] : 'Input tidak valid';
      return res.render('customers_form', {
        error: message,
        customer: body,
        title: 'Tambah Pelanggan',
        action: '/customers/add'
      });
    }
    await this.customersService.create(customerDto);
    return res.redirect('/customers/list');
  }

  @Get('edit/:id')
  @Render('customers_form')
  async showEdit(@Param('id') id: number) {
    const customer = await this.customersService.findOne(id);
    return {
      title: 'Edit Pelanggan',
      action: `/customers/update/${id}`,
      customer,
      error: null
    };
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() body: any, @Res() res) {
    // Gunakan UpdateCustomerDto (biasanya pakai PartialType)
    const updateDto = plainToInstance(UpdateCustomerDto, body);
    const errors = await validate(updateDto);

    if (errors.length > 0) {
      const message = errors[0].constraints ? Object.values(errors[0].constraints)[0] : 'Update gagal';
      return res.render('customers_form', {
        error: message,
        customer: { id, ...body }, // Kirim ID kembali agar action form tidak rusak
        title: 'Edit Pelanggan',
        action: `/customers/update/${id}`
      });
    }

    await this.customersService.update(id, updateDto);
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
