import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// @ts-expect-error
import { Response } from 'express'
import { adaptNestJSResolver } from 'src/shared/infra/http/nestjs/nestjs-router'
import { CreatePatientInput } from 'src/shared/infra/http/nestjs/admission/input/create-patient-input'
import PatientController from 'src/admission/infra/controller/patient-controller'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'
import PatientDAODatabase from 'src/admission/infra/database/dao/patient-DAO-database'

@Controller('patients')
@ApiTags('Patient')
export class PatientRouter {
  private readonly patientController: PatientController
  constructor () {
    this.patientController = new PatientController(new PatientRepositoryDatabase(), new PatientDAODatabase())
  }

  @Post('')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Create new patient' })
  async create (@Body() input: CreatePatientInput, @Res() response: Response): Promise<any> {
    const patientResponse = await this.patientController.create(input)
    return adaptNestJSResolver(patientResponse, response)
  }

  @Put('/:patientId')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Create new patient' })
  async update (@Param('patientId') patientId: string, @Body() input: CreatePatientInput, @Res() response: Response): Promise<any> {
    const patientResponse = await this.patientController.update(patientId, input)
    return adaptNestJSResolver(patientResponse, response)
  }

  @Get('')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'List patients by filter' })
  async findAll (@Res() response: Response): Promise<any> {
    const patientResponse = await this.patientController.getPatients()
    return adaptNestJSResolver(patientResponse, response)
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get patient by id' })
  async findById (@Param('id') id: string, @Res() response: Response): Promise<any> {
    const patientResponse = await this.patientController.findById(id)
    return adaptNestJSResolver(patientResponse, response)
  }
}
