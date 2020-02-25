import { CommonModule } from './../../../../libs/common/src/common.module';
import { User } from '@app/db/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '@app/auth';
import { Email } from '@app/db/entity/email.entity';
import { UserActions } from '@app/db/entity/user-actions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Email, UserActions]),
    AuthModule,
    CommonModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
