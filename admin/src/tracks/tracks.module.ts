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
    ClientsModule.register([
      {
        name: 'MICRO',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ijlzzeta:I3GvVmS3-Age28GhzRvo6cGXCvJPfuNV@rat.rmq2.cloudamqp.com/ijlzzeta',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService, FilesService],
  exports: [TracksService, ClientsModule],
})
export class TracksModule {}
