import { EditPswdDto } from './dto/edit-pswd.dto';
import { MyappForgetPswdPipe } from './../../../../libs/common/src/pipe/myapp-forget-pswd.pipe';
import { MyappVerifyCodePipe } from '../../../../libs/common/src/pipe/myapp-verify-code.pipe';
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
import { ForgetPswdDto } from './dto/forget-pswd.dto';
import { MyappEditPswdPipe } from '@app/common/pipe/myapp-edit-pswd.pipe';

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
  @UsePipes(MyappRegisterPipe, MyappVerifyCodePipe)
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

  @Put('/forgetpswd')
  @ApiOperation({ summary: '忘记密码' })
  @UsePipes(MyappForgetPswdPipe, MyappVerifyCodePipe)
  async forgetpswd(
    @Body() forgetPswdDto: ForgetPswdDto,
    @Request() req
  ): Promise<Client> {
    const result = await this.userService.forgetpswd(forgetPswdDto);
    return {
      code: 2000,
      message: '密码初始化成功，建议您立即修改。',
      result
    };
  }

  @Put('/editpswd')
  @UseGuards(AuthGuard('myapp-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '修改密码' })
  @UsePipes(MyappEditPswdPipe)
  async editPswd(
    @Body() editPswdDto: EditPswdDto,
    @Request() req
  ): Promise<Client> {
    const { id } = req.user;
    const { firstPswd: newPswd, oldPswd } = editPswdDto;
    await this.userService.editPswd(id, oldPswd, newPswd);
    return {
      code: 2000,
      message: '密码修改成功，请您重新登录。'
    };
  }

  @Post('/resister/code')
  @ApiOperation({ summary: '发送注册验证码' })
  @UsePipes(MyappRegisterPipe)
  async sendResisterEmail(
    @Body() emailDto: EmailDto,
    @Request() req
  ): Promise<Client> {
    const { email } = req.body;
    const randomCode = this.commonService.randomCode();
    const content = `<h1>${process.env.EMAIL_SUBJECT}管理员致电!</h1><p style="font-size: 18px;color:#000;">尊敬的申请者您好，欢迎您注册猿来阅掌上阅读，验证码为：<u style="font-size: 16px;color:#1890ff;">${randomCode}</u></p><p style="font-size: 14px;color:#ff0000;">验证码10分钟内有效</p>`;
    // 发送邮件
    const { messageId }: any = await this.commonService.sendEmail({
      email,
      content
    });
    const id = messageId.slice(1, -1);
    const fail_time = Date.now() + 1000 * 60 * 10;
    // 保存发送邮件的相关信息
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

  @Post('/forgetpswd/code')
  @ApiOperation({ summary: '发送忘记密码密码验证码' })
  @UsePipes(MyappForgetPswdPipe)
  async sendForgetpswdEmail(
    @Body() emailDto: EmailDto,
    @Request() req
  ): Promise<Client> {
    const { email } = req.body;
    const randomCode = this.commonService.randomCode();
    const content = `<h1>${process.env.EMAIL_SUBJECT}管理员致电!</h1><p style="font-size: 18px;color:#000;">尊敬的用户您好，您正在试图找回密码，如非您本人操作，请忽略！验证码为：<u style="font-size: 16px;color:#1890ff;">${randomCode}</u></p><p style="font-size: 14px;color:#ff0000;">验证码10分钟内有效</p>`;
    // 发送邮件
    const { messageId }: any = await this.commonService.sendEmail({
      email,
      content
    });
    const id = messageId.slice(1, -1);
    const fail_time = Date.now() + 1000 * 60 * 10;
    // 保存发送邮件的相关信息
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

  @Get('/fav')
  @UseGuards(AuthGuard('myapp-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户收藏' })
  async getFavList(@Request() req): Promise<Client> {
    const favList = await this.userService.getFavList(req.user);
    return {
      result: favList,
      code: 2000,
      message: '收藏列表查询成功'
    };
  }
}
