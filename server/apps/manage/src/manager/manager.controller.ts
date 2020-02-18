import { Client } from '@app/common/interface/client.interface';
import { AuthService } from '../../../../libs/auth/src/auth.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { LoginManagerDto } from './dto/login-manager.dto';
import { UsersService } from './manager.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('管理员')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  // @Delete('/delete')
  // @ApiOperation({ summary: '删除管理员' })
  // async delete(@Body() deleteDto: DeleteUsersDto): Promise<any> {
  //   return await this.usersService.delete(deleteDto)
  // }

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() createDto: CreateManagerDto): Promise<Client> {
    const user = await this.usersService.register(createDto);
    return {
      code: 2010,
      message: '注册成功！',
      result: user
    };
  }

  @Put('/login')
  @UseGuards(AuthGuard('manage-local'))
  @ApiOperation({ summary: '登录' })
  async login(
    @Body() loginDto: LoginManagerDto,
    @Request() req
  ): Promise<Client> {
    // 通过验证  拿到用户信息
    const { password, ...result } = req.user;
    // 生成 token
    const token = await this.authService.setToken(result);
    return { result: token, code: 2011, message: '登陆成功' };
  }

  @Put('/logout')
  @UseGuards(AuthGuard('manage-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '退出登录' })
  async logout(@Request() req): Promise<Client> {
    return {
      code: 2012,
      message: '退出登录成功！'
    };
  }

  @Get()
  @UseGuards(AuthGuard('manage-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户信息' })
  async getUser(@Request() req): Promise<Client> {
    const user = await this.usersService.getUser(req.user);

    return { result: user, code: 2000, message: 'Token验证通过。' };
  }
}
