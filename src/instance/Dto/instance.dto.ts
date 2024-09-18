import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstanceDto {
  @IsNotEmpty()
  instanceName: string;

  instanceDescription: string;

  @ApiProperty({
    example: '2024-08-20 00:00:00',
  })
  startDate: Date;

  @ApiProperty({
    example: '2024-08-20 00:00:00',
  })
  endDate: Date;
}

export class InstanceId {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  instanceId: number;
}
