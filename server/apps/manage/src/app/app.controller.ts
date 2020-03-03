import { App } from '@app/db/entity/app.entity';
import { AppService } from './app.service';
import { Client } from './../../../../libs/common/src/interface/client.interface';
import { CreateAdImgDto } from './dto/create-ad-img.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EditAdImgDto } from './dto/edit-ad-img.dto';

@Controller('app')
@ApiTags('APP管理')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ad')
  @ApiOperation({ summary: '广告_获取广告列表' })
  async findAllAdImg(): Promise<Client> {
    const adimg = await this.appService.findAllAdImg();
    return {
      code: 2000,
      message: '获取广告列表成功',
      result: adimg
    };
  }

  @Post('ad')
  @ApiOperation({ summary: '广告_新增广告' })
  async createAdImg(@Body() createAdImgDto: CreateAdImgDto): Promise<Client> {
    const adimg = await this.appService.createAdImg(createAdImgDto);
    return {
      code: 2001,
      message: '新增广告成功',
      result: adimg
    };
  }

  @Put('ad/:id')
  @ApiOperation({ summary: '广告_修改一条广告' })
  async editAdImg(
    @Body() editAdImgDto: EditAdImgDto,
    @Param('id') id: number
  ): Promise<Client> {
    const adimg = await this.appService.editAdImg(id, editAdImgDto);
    return {
      code: 2000,
      message: '修改广告成功',
      result: adimg
    };
  }

  @Delete('ad/:id')
  @ApiOperation({ summary: '广告_删除一条广告' })
  async delAdImg(@Param('id') id: number): Promise<Client> {
    await this.appService.delAdImg(id);
    return {
      code: 2000,
      message: '删除广告成功'
    };
  }

  @Get('/version')
  @ApiOperation({ summary: 'app版本_获取app版本信息' })
  async getAppInfo(): Promise<Client> {
    const appInfo = await this.appService.getAppInfo();
    return {
      code: 2000,
      message: 'app版本信息获取成功',
      result: appInfo
    };
  }

  @Put('/version')
  @ApiOperation({ summary: 'app版本_修改app版本信息' })
  async setAppInfo(@Body() app: App): Promise<Client> {
    const appInfo = await this.appService.setAppInfo(app);
    return {
      code: 2000,
      message: 'app版本信息修改成功',
      result: appInfo
    };
  }
}
