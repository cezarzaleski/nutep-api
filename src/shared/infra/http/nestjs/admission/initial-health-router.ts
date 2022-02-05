import { Body, Controller, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// @ts-expect-error
import { Response } from 'express'
import { adaptNestJSResolver } from 'src/shared/infra/http/nestjs/nestjs-router'
import PatientAdmissionRepositoryDatabase from 'src/admission/infra/database/repository/patient-admission-repository-database'
import InitialHealthController from 'src/admission/infra/controller/initial-health-controller'
import { InitialHealthInput } from 'src/admission/application/dto/initial-health-input'
import InitialHealthRepositoryDatabase from 'src/admission/infra/database/repository/initial-health-repository-database'

@Controller('initial-health/admission/:admissionId')
@ApiTags('Ini')
export class InitialHealthRouter {
  private readonly initialHealthController: InitialHealthController

  constructor () {
    this.initialHealthController = new InitialHealthController(
      new PatientAdmissionRepositoryDatabase(),
      new InitialHealthRepositoryDatabase()
    )
  }

  @Post('')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Add new initial health admission' })
  async create (@Param('admissionId') admissionId: string, @Body() input: InitialHealthInput, @Res() response: Response): Promise<any> {
    const admissionResponse = await this.initialHealthController.save(input, admissionId)
    return adaptNestJSResolver(admissionResponse, response)
  }

  @Put('')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Add new initial health admission' })
  async update (@Param('admissionId') admissionId: string, @Body() input: InitialHealthInput, @Res() response: Response): Promise<any> {
    const admissionResponse = await this.initialHealthController.update(input, admissionId)
    return adaptNestJSResolver(admissionResponse, response)
  }
}
