import { RolesGuard } from '../../../../libs/auth/src/guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Client } from './../../../../libs/common/src/interface/client.interface';
import { SiteService } from './site.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@app/common/decorator/roles.decorator';

@Controller('site')
@ApiTags('系统设置')
@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard('manage-jwt'), RolesGuard)
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

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
}
