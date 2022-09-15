import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';
import { FilesModule } from '../files/files.module';
import { FilesService } from '../files/files.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    FilesModule,
  ],
  controllers: [TracksController],
  providers: [TracksService, FilesService],
  exports: [TracksService, ClientsModule],
})
export class TracksModule {}
