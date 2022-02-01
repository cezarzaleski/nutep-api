import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { adaptNestJSResolver } from 'test/shared/infra/http/nestjs/nestjs-router';
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database';
import AdmissionController from 'src/admission/infra/controller/admission-controller';
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input';
import AdmissionRepositoryDatabase from 'src/admission/infra/database/repository/admission-repository-database';

@Controller('admissions')
@ApiTags('Admissions')
export class AdmissionRouter {
  private admissionController: AdmissionController
  constructor() {
    this.admissionController = new AdmissionController(new AdmissionRepositoryDatabase(), new PatientRepositoryDatabase());
  }

  @Post('/initial')
  @ApiResponse({status: HttpStatus.CREATED})
  @ApiOperation({summary: 'Create new patient'})
  async create(@Body() input: InitialAdmissionInput, @Res() response: Response) {
    const patientResponse = await this.admissionController.initial(input)
    return adaptNestJSResolver(patientResponse, response)
  }
}
