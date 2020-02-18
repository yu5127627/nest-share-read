import { AuthModule } from 'libs/auth/src';
import { Manager } from '../../../../libs/db/src/entity/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './manager.controller';
import { UsersService } from './manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manager]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
