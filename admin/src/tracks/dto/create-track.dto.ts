import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'Yesterday', description: 'Track title' })
  @IsString()
  @Length(1, 15)
  readonly name: string;

  @ApiProperty({ example: 'Beetles', description: "Artist's or band's name" })
  @IsString()
  @Length(1, 15)
  readonly artist: string;

  @ApiProperty({
    example: 'Yesterday all my trouble ...',
    description: 'Track lyrics',
  })
  @IsString()
  @Length(20, 400)
  readonly text: string;
}
