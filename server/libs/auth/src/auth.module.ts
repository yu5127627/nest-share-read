import { MyappJwtStrategy } from './strategy/my-app/myapp-jwt.strategy';
import { MyappLocalStrategy } from './strategy/my-app/myapp-local.strategy';
import { User } from '@app/db/entity/user.entity';
import { RolesGuard } from './guard/roles.guard';
import { ManageJwtStrategy } from './strategy/manage/manage-jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Manager } from '@app/db/entity/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageLocalStrategy } from './strategy/manage/manage-local.strategy';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manager, User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.MANAGE_AUTH_SECRET,
        signOptions: {
          expiresIn: 3600
        }
      })
    }),
    RolesGuard
  ],
  providers: [
    AuthService,
    ManageLocalStrategy,
    ManageJwtStrategy,
    MyappLocalStrategy,
    MyappJwtStrategy
  ],
  exports: [AuthService, RolesGuard]
})
export class AuthModule {}
