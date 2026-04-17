import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Logger} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as express from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService,) {}

  @Get('login')
  @Render('login')
  showLogin(){
    return { message: 'Silahkan Login'};
  }

  @Post('login')
async login(@Body() body, @Res() res) {
  const { username, password } = body;

  try {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      this.logger.warn(`Invalid login attempt for ${username}`);
      return res.render('login', { 
        error: 'Kombinasi username atau password tidak valid.',
        title: 'Login - Sales Test'
      });
    }
    this.logger.log(`User logged in successfully: ${username}`);
    // Jika sukses
    return res.redirect('/dashboard');

  } catch (e) {
    return res.render('login', { 
      error: 'Terjadi gangguan sistem, coba lagi nanti.',
      title: 'Login - Sales Test'
    });
  }
}

  @Get('users_list') // Menangkap request ke /users (atau /admin tergantung @Controller-nya)
    @Render('users_list') // Nama file .ejs kamu (misal: views/users_list.ejs)
    async viewAllUsers() {
    const users = await this.authService.findAll();
  return { users }; // Mengirim array users ke file EJS
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Get('edit/:id')
  @Render('auth_form')
  async showEdit(@Param('id') id: string) {
    const user = await this.authService.findOne(+id);
    return { 
      title: 'Edit Admin', 
      user, 
      action: `/auth/update/${id}` // Tambahkan ini
    };
  } 

  @Post('update/:id')
  async update(@Param('id') id: string, @Body() body, @Res() res) {
    try {
      await this.authService.update(+id, body);
      return res.redirect('/auth/users_list');
    } catch (error) {
      console.error(error);
    return res.status(500).send('Error updating user');
    }
  }

  @Post('delete/:id')
    async remove(@Param('id') id: string, @Res() res) {
    await this.authService.remove(+id);
  return res.redirect('/auth/users_list');
  }
}
