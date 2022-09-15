import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto {
  readonly name?: string;
  readonly artist?: string;
  readonly text?: string;
}
