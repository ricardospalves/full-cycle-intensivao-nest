import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'upload/');
  },
  filename: (request, file, callback) => {
    callback(
      null,
      `${Date.now()}_${file.originalname}${path.extname(file.originalname)}`,
    );
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
