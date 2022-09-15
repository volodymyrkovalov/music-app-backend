import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TracksModule } from '../tracks/tracks.module';
import { TracksService } from '../tracks/tracks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Track, TrackSchema } from '../tracks/schemas/track.schema';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, TracksService],
  imports: [
    TracksModule,
    FilesModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
})
export class CommentsModule {}
