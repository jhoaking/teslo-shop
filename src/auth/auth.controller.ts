import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth,GetUser,RawHeaders,RoleProtected } from './Decorator';

import { CreateUserDto, LoginUserDto } from './dto';
import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


 @Get('check-auth-status')
 @Auth()
 checkAuthStatus(
  @GetUser( ) user:User
 ){
  return this.authService.checkAuthStatus(user)
 }

  @Get('private')
  @UseGuards(AuthGuard())
  tesrtingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail : string,

     @RawHeaders() rawheaders : string[]

  ) {

    return {
      ok: true,
      user :  user,
      userEmail,
      rawheaders
    };
  }
  //@SetMetadata('roles',['admin','super-user'])

  @Get('private2')
  @RoleProtected(ValidRoles.superUser,ValidRoles.admin)
  @UseGuards(AuthGuard(),UserRoleGuard)
  privateRoute2(
    @GetUser() user:User

  ){

    return {
      ok : true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user:User

  ){

    return {
      ok : true,
      user
    }
  }
}
