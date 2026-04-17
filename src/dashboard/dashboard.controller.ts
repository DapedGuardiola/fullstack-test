import { Controller, Get, Post, Body, Patch, Param, Delete,Render, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { TransactionsService } from './../transaction/transaction.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly transactionsService: TransactionsService,
  ) {}
  @Get()
  @Render('dashboard')
  async getDashboard() {
    const transactions = await this.transactionsService.findAll();
    return { 
      transactions, 
      total_sales: transactions.reduce((sum, item) => sum + item.total_price, 0) 
    };
  }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
