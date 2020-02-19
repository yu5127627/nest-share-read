import {
  coverVerification,
  catalogVerification,
  bookVerification
} from './upload.config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
@ApiTags('上传模块')
@UseGuards(AuthGuard('manage-jwt'))
@ApiBearerAuth()
export class UploadController {
  @Post('/cover')
  @ApiOperation({ summary: '封面图上传' })
  @UseInterceptors(FileInterceptor('cover', coverVerification))
  uploadImg(@UploadedFile() file): { coverUrl: string } {
    const { path } = file;
    return { coverUrl: '/'+path };
  }

  @Post('/catalog')
  @ApiOperation({ summary: '目录上传' })
  @UseInterceptors(FilesInterceptor('catalog', 20, catalogVerification))
  uploadCatalog(@UploadedFiles() files): Array<string> {
    let catalogArr: Array<string> = [];
    for (const item of files) {
      const { path } = item;
      catalogArr.push('/'+path);
    }
    return catalogArr;
  }

  @Post('/book')
  @ApiOperation({ summary: '图书上传' })
  @UseInterceptors(FileInterceptor('book', bookVerification))
  uploadBook(@UploadedFile() file): { bookUrl: string } {
    const { path } = file;
    return { bookUrl: '/'+path };
  }
}
