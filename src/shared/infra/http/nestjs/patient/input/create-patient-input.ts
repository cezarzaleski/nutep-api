import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientInput {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  sex: string;
  @ApiProperty()
  cpf?: string;
  @ApiProperty()
  register?: string;
  @ApiProperty()
  attendingPhysician?: string;
  @ApiProperty()
  healthCare?: string;
  @ApiProperty()
  linkPhoto?: string;
}
