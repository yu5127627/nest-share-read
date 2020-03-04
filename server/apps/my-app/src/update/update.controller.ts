import { Client } from './../../../../libs/common/src/interface/client.interface';
import { UpdateService } from './update.service';
import { AppDto } from './dto/app.dto';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('update')
@ApiTags('app更新')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Post()
  @ApiOperation({ summary: '检测是否更新' })
  async checkUpdate(@Body() appDto: AppDto): Promise<Client> {
    const updateInfo = await this.updateService.checkUpdate(appDto);
    return {
      code: 2000,
      message: '检测完成。',
      result: updateInfo
    };
  }

  @Get('start')
  @ApiOperation({ summary: '获取开屏广告' })
  async startAdimg(): Promise<Client> {
    const adimg = await this.updateService.startAdimg();
    return {
      code: 2000,
      message: '开屏广告获取成功。',
      result: adimg
    };
  }
}
