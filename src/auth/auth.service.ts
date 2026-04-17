import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';            
import { User } from './entities/user.entity';       
import * as bcrypt from 'bcrypt';           
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';        
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async register(username: string, pass: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    await this.userRepository.update(id, updateAuthDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
