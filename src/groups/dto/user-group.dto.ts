import { IsNotEmpty } from 'class-validator';

export class InputDto {
  @IsNotEmpty()
  eventId: number;

  @IsNotEmpty()
  groupId: number;
}

export class DataAddUser {
  @IsNotEmpty()
  userId: number;
}

export class InputDeleteDto extends InputDto {
  @IsNotEmpty()
  userId: number;
}
