import { Manager } from '../../../../libs/db/src/entity/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Manager) private readonly userRepository: Repository<Manager>
  ) {}

  async getAllManage(): Promise<Manager[]> {
    return await this.userRepository.find();
  }
}
