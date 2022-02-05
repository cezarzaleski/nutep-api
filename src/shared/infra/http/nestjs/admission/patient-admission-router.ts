import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// @ts-expect-error
import { Response } from 'express'
import { adaptNestJSResolver } from 'src/shared/infra/http/nestjs/nestjs-router'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'
import PatientAdmissionController from 'src/admission/infra/controller/patient-admission-controller'
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input'
import PatientAdmissionRepositoryDatabase from 'src/admission/infra/database/repository/patient-admission-repository-database'
import PatientAdmissionDAODatabase from 'src/admission/infra/database/dao/patient-admission-DAO-database'
import InitialHealthRepositoryDatabase from 'src/admission/infra/database/repository/initial-health-repository-database'
import AdmissionRepositoryDatabase from 'src/admission/infra/database/repository/admission-repository-database'
import { FinalizeAdmissionInput } from 'src/admission/application/dto/finalize-admission-input'

@Controller('patient-admissions')
@ApiTags('Patient Admissions')
export class PatientAdmissionRouter {
  private readonly admissionController: PatientAdmissionController

  constructor () {
    this.admissionController = new PatientAdmissionController(
      new PatientAdmissionRepositoryDatabase(),
      new PatientRepositoryDatabase(),
      new PatientAdmissionDAODatabase(),
      new InitialHealthRepositoryDatabase(),
      new AdmissionRepositoryDatabase()
    )
  }

  @Post('/initial')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Create new patient' })
  async create (@Body() input: InitialAdmissionInput, @Res() response: Response): Promise<any> {
    const patientAdmissionResponse = await this.admissionController.initial(input)
    return adaptNestJSResolver(patientAdmissionResponse, response)
  }

  @Get('')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'List admissions by filter' })
  async findAll (@Res() response: Response): Promise<any> {
    const patientAdmissionResponse = await this.admissionController.findAll()
    return adaptNestJSResolver(patientAdmissionResponse, response)
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get admission by id' })
  async findById (@Param('id') id: string, @Res() response: Response): Promise<any> {
    const patientAdmissionResponse = await this.admissionController.findById(id)
    return adaptNestJSResolver(patientAdmissionResponse, response)
  }

  @Put('/:admissionId')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Update admission patient' })
  async update (
    @Param('admissionId') admissionId: string,
      @Body() input: InitialAdmissionInput, @Res() response: Response
  ): Promise<any> {
    const patientAdmissionResponse = await this.admissionController.update(admissionId, input)
    return adaptNestJSResolver(patientAdmissionResponse, response)
  }

  @Post('/:admissionId/finalize')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Finalize admission patient' })
  async finalize (
    @Param('admissionId') admissionId: string,
      @Body() input: FinalizeAdmissionInput,
      @Res() response: Response
  ): Promise<any> {
    const admissionResponse = await this.admissionController.finalize(input, admissionId)
    return adaptNestJSResolver(admissionResponse, response)
  }
}
