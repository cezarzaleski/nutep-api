import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { adaptNestJSResolver } from 'test/shared/infra/http/nestjs/nestjs-router';
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database';
import AdmissionController from 'src/admission/infra/controller/admission-controller';
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input';
import AdmissionRepositoryDatabase from 'src/admission/infra/database/repository/admission-repository-database';
import AdmissionDAODatabase from 'src/admission/infra/database/dao/admission-DAO-database';

@Controller('admissions')
@ApiTags('Admissions')
export class AdmissionRouter {
  private admissionController: AdmissionController

  constructor() {
    this.admissionController = new AdmissionController
    (
      new AdmissionRepositoryDatabase(),
      new PatientRepositoryDatabase(),
      new AdmissionDAODatabase()
    )
  }

  @Post('/initial')
  @ApiResponse({status: HttpStatus.CREATED})
  @ApiOperation({summary: 'Create new patient'})
  async create(@Body() input: InitialAdmissionInput, @Res() response: Response) {
    const admissionResponse = await this.admissionController.initial(input)
    return adaptNestJSResolver(admissionResponse, response)
  }

  @Get('')
  @ApiResponse({status: HttpStatus.OK})
  @ApiOperation({summary: 'List admissions by filter'})
  async findAll(@Res() response: Response) {
    const admissionResponse = await this.admissionController.findAll()
    return adaptNestJSResolver(admissionResponse, response)
  }
}
