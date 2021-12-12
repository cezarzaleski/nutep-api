import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import UserRepositoryDatabase from 'src/authenticate/infra/database/repository/user-repository-database';
import { adaptNestJSResolver } from 'test/shared/infra/http/nestjs/nestjs-router';
import UserController from 'src/authenticate/infra/controller/user-controller';

@Controller('users')
@ApiTags('User')
export class UserRouter {
  private userController: UserController
  constructor() {
    this.userController = new UserController(new UserRepositoryDatabase())
  }
  @Get('/:id')
  @ApiResponse({status: HttpStatus.OK})
  @ApiOperation({summary: 'Get user by id'})
  async findById(@Param('id') id: string, @Res() response: Response) {
    const userResponse = await this.userController.findById(id)
    return adaptNestJSResolver(userResponse, response)
  }
}
