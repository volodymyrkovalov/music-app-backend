import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddRoleDto {
  @IsString()
  readonly value: string;
  @IsMongoId()
  readonly userId: ObjectId;
}
