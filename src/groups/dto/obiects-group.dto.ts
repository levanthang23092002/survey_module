import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class inputCreateGroup {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  instanceId: number;
}
export class ContentCreateGroup {
  @ApiProperty({
    example: 'Survey',
  })
  @IsNotEmpty()
  type: string;
}
export class inputDeleteGroup extends inputCreateGroup {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  groupId: number;
}

export class DataUpdateGroup extends ContentCreateGroup {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  userid: number;
}
