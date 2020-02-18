import { Manager } from './../../../../libs/db/src/entity/manager.entity';
import { DeleteManagerDto } from './dto/delete-manager.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcryptjs';
import { PayloadDto } from 'libs/auth/src/dto/payload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  async delete(deleteDto: DeleteManagerDto): Promise<any> {
    const { id } = deleteDto;
    const user = await this.managerRepository.delete(id);
    return { status: 1, message: '删除成功' };
  }

  async register(createDto: CreateManagerDto): Promise<Manager> {
    createDto.create_time = Date.now();
    createDto.password = hashSync(createDto.password);
    return await this.managerRepository.save(createDto);
  }

  async getUser(user: PayloadDto): Promise<Manager> {
    return await this.managerRepository.findOne(user.id);
  }
}
