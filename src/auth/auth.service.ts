import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...data } = createUserDto;

      const user = this.userRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.log(error);
      this.hanclerDbError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      });

      if (!user)
        throw new UnauthorizedException('credentials not valid ( email)');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('credentials not valid ( password)');

      return user;
      
    } catch (error) {
      this.hanclerDbError(error);
      console.log(error);
    }
  }

  private hanclerDbError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException('please check server  logs');
  }
}
