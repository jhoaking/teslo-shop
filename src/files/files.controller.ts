import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.hlper';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product') // cualquier tipo de archivo
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:fileFilter,
    //limits  : {fileSize : 1000}
    storage :  diskStorage({ 
      destination : './static/uploads'
    })
  }))
  insertProductFileFile(@UploadedFile() file: Express.Multer.File) {

    if(!file){
      throw new BadRequestException('lo que me mandaste no es una imagen pichi ')
    }

    return {
      fileNmae: file.originalname,
    };
  }
}
