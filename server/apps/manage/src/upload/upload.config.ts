import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

// 改模块全局上传配置
export const uploadGlobalConfig = MulterModule.registerAsync({
  useFactory: () => ({
    preservePath: true,
    storage: diskStorage({
      // 配置文件上传后的文件夹路径
      destination: (req, file, cb) => {
        switch (file.fieldname) {
          case 'cover':
            checkDirAndCreate(coverPath);
            cb(null, coverPath);
            break;
          case 'book':
            checkDirAndCreate(bookPath);
            cb(null, bookPath);
            break;
          case 'catalog':
            checkDirAndCreate(catalogPath);
            cb(null, catalogPath);
            break;
        }
      },
      filename: (req, file, cb) => {
        // 在此处自定义保存后的文件名称
        const type: string[] = file.originalname.split('.');
        const filename = `${Date.now()}.${type[type.length - 1]}`;
        return cb(null, filename);
      }
    })
  })
});

// 根据路径创建目录
export const checkDirAndCreate = filePath => {
  const pathArr = filePath.split('/');
  let checkPath: string = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};

// 封面图储存路径
export const coverPath: string = 'upload/images/covers';
// 封面图验证规则
export const coverVerification: object = {
  limits: { fileSize: 1024 * 500 }, // fileSize:kb
  fileFilter(req, file, cb) {
    const mimetype = file.mimetype.split('/')[0].toLowerCase();
    const isErr = mimetype === 'image' ? true : false;
    isErr
      ? cb(null, isErr)
      : cb(
          new BadRequestException('文件格式错误！请确保你上传的为图片。'),
          false
        );
  }
};

// 图书储存路径
export const bookPath: string = 'upload/books';
// 图书验证
export const bookVerification: object = {
  limits: { fileSize: 1024 * 1024 * 300 },
  fileFilter(req, file, cb) {
    const mimetype = file.mimetype.split('/')[1].toLowerCase();
    const isErr = mimetype === 'pdf' ? true : false;
    isErr
      ? cb(null, isErr)
      : cb(
          new BadRequestException('文件格式错误！请确保你上传的为 PDF 格式。'),
          false
        );
  }
};

// 目录截图储存路径
export const catalogPath: string = 'upload/images/catalog';
// 目录验证
export const catalogVerification: object = {
  limits: { fileSize: 1024 * 500 },
  fileFilter(req, file, cb) {
    const mimetype = file.mimetype.split('/')[0].toLowerCase();
    const isErr = mimetype === 'image' ? true : false;
    isErr
      ? cb(null, isErr)
      : cb(
          new BadRequestException('文件格式错误！请确保你上传的为图片。'),
          false
        );
  }
};
