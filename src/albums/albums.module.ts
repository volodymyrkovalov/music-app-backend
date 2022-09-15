import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';
import { TracksService } from '../tracks/tracks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Track, TrackSchema } from '../tracks/schemas/track.schema';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService],
  imports: [
    TracksModule,
    FilesModule,
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
})
export class AlbumsModule {}
