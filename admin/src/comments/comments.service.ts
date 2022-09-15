import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TracksService } from '../tracks/tracks.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly tracksService: TracksService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const track = await this.tracksService.findOne(createCommentDto.trackId);
    const comment = await this.commentModel.create({ ...createCommentDto });
    track.comments.push(comment);
    await this.tracksService.update(track._id, track);
    return comment;
  }

  async remove(id: ObjectId) {
    const track = await this.commentModel.findByIdAndDelete(id);
    return track._id;
  }
}
