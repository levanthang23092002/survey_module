import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class inputCreateGroup {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  instanceId: number;
}

export class inputDeleteGroup extends inputCreateGroup {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  groupId: number;
}
