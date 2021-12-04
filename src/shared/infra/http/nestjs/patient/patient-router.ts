import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { adaptNestJSResolver } from 'test/shared/infra/http/nestjs/nestjs-router';
import { CreatePatientInput } from 'src/shared/infra/http/nestjs/patient/input/create-patient-input';
import PatientController from 'src/patient/infra/controller/patient-controller';
import PatientRepositoryDatabase from 'src/patient/infra/database/repository/patient-repository-database';
import { MongoPatientModel } from 'src/patient/infra/database/schemas/mongo-patient.schema';

@Controller('patient')
@ApiTags('Patient')
export class PatientRouter {
  private patientController: PatientController


  constructor() {
    this.patientController = new PatientController(new PatientRepositoryDatabase());
  }

  @Post('')
  @ApiResponse({status: HttpStatus.OK})
  @ApiOperation({summary: 'Create new patient'})
  async create(@Body() input: CreatePatientInput, @Res() response: Response) {
    const patientResponse = await this.patientController.create(input)
    MongoPatientModel.find()
    return adaptNestJSResolver(patientResponse, response)
  }
}
