import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary/cloudinary';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  imports:[ConfigModule],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
