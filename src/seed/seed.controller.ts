import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/auth/Decorator';
import { ValidRoles } from 'src/auth/interfaces';

import { SeedService } from './seed.service';


@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiResponse({status : 200 , description : 'seed was correctly executed'})
  //@Auth(ValidRoles.admin)
  executedSeed(){
    return this.seedService.runSeed();
  }
}
