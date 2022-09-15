import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { isValidObjectId, ObjectId } from 'mongoose';

export class AddTrackToAlbumDto {
  @ApiProperty({ description: 'Track id' })
  @IsMongoId({ message: 'This should be an object id' })
  track: ObjectId;
}
