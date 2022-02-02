import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
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

  @Get('/:id')
  @ApiResponse({status: HttpStatus.OK})
  @ApiOperation({summary: 'Get admission by id'})
  async findById(@Param('id') id: string, @Res() response: Response) {
    const admissionResponse = await this.admissionController.findById(id)
    return adaptNestJSResolver(admissionResponse, response)
  }

  @Put('/:admissionId')
  @ApiResponse({status: HttpStatus.OK})
  @ApiOperation({summary: 'Upate admission patient'})
  async update(@Param('admissionId') admissionId: string, @Body() input: InitialAdmissionInput, @Res() response: Response) {
    const patientResponse = await this.admissionController.update(admissionId, input)
    return adaptNestJSResolver(patientResponse, response)
  }
}
