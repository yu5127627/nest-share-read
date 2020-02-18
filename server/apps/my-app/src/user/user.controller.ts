import { MyappRegisterCodePipe } from './../../../../libs/common/src/pipe/myapp-register-code.pipe';
import { CommonService } from './../../../../libs/common/src/common.service';
import { MyappRegisterPipe } from './../../../../libs/common/src/pipe/myapp-register.pipe';
import { AuthService } from './../../../../libs/auth/src/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { Client } from './../../../../libs/common/src/interface/client.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Request,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly commonService: CommonService
  ) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  @UsePipes(MyappRegisterPipe, MyappRegisterCodePipe)
  async register(
    @Body() registerDto: RegisterDto,
    @Request() req
  ): Promise<Client> {
    const { emailId, code, ...result } = req.body;
    const user = await this.userService.register(result);
    console.log(user);
    return {
      code: 2001,
      message: '注册成功！',
      result: user
    };
  }

  @Post('/code')
  @ApiOperation({ summary: '发送验证码' })
  @UsePipes(MyappRegisterPipe)
  async sendEmail(@Body() emailDto: EmailDto, @Request() req): Promise<Client> {
    const { email } = req.body;
    const randomCode = this.commonService.randomCode();
    const { messageId }: any = await this.commonService.sendEmail({
      email,
      randomCode
    });
    const id = messageId.slice(1, -1);
    const fail_time = Date.now() + 1000 * 60 * 10;
    const { code, ...result } = await this.userService.createEmail({
      id,
      email,
      code: randomCode,
      fail_time
    });

    return {
      code: 2001,
      message: '验证码发送成功，请注意查收！',
      result
    };
  }

  @Put('/login')
  @UseGuards(AuthGuard('myapp-local'))
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginDto: LoginDto, @Request() req): Promise<Client> {
    // 通过验证  拿到用户信息
    const { password, ...result } = req.user;
    // 生成 token
    const token = await this.authService.setUserToken(result);
    return { result: token, code: 2001, message: '登陆成功' };
  }

  @Get()
  @UseGuards(AuthGuard('myapp-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户信息' })
  async getUser(@Request() req): Promise<Client> {
    const user = await this.userService.getUser(req.user);

    return { result: user, code: 2000, message: 'Token验证通过。' };
  }
}
