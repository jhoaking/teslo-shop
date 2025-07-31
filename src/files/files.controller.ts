import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';


import { Response } from 'express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';



@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProduct(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticProducImage(imageName);

    res.sendFile(path);
  }

  @Post('product') // cualquier tipo de archivo
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      //limits  : {fileSize : 1000}
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  insertProductFileFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'lo que me mandaste no es una imagen pichi ',
      );
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/products/${file.filename}`;

    return {
      secureUrl,
    };
  }
}
