import { uploadGlobalConfig } from './upload.config'
import { UploadController } from './upload.controller'
import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'

@Module({
  imports: [uploadGlobalConfig],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
