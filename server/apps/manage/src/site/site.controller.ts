import { App } from '@app/db/entity/app.entity';
import { AppService } from './app.service';
import { RolesGuard } from './../../../../libs/auth/src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Client } from './../../../../libs/common/src/interface/client.interface';
import { SiteService } from './site.service';
import { Controller, Get, UseGuards, Body, Put } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@app/common/decorator/roles.decorator';

@Controller('site')
@ApiTags('系统设置')
@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard('manage-jwt'), RolesGuard)
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly appService: AppService
  ) {}

  @Get('/manager')
  @ApiOperation({ summary: '管理员列表' })
  async getAllManage(): Promise<Client> {
    const allManagers = await this.siteService.getAllManage();
    return {
      code: 2000,
      message: '管理员查询成功！',
      result: allManagers
    };
  }

  @Get('/app')
  @ApiOperation({ summary: '获取app版本信息' })
  async getAppInfo(): Promise<Client> {
    const appInfo = await this.appService.getAppInfo();
    return {
      code: 2000,
      message: 'app版本信息获取成功',
      result: appInfo
    };
  }

  @Put('/app')
  @ApiOperation({ summary: '修改app版本信息' })
  async setAppInfo(@Body() app: App): Promise<Client> {
    const appInfo = await this.appService.setAppInfo(app);
    return {
      code: 2000,
      message: 'app版本信息修改成功',
      result: appInfo
    };
  }
}
