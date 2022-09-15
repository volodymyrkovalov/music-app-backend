import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FilesService } from '../files/files.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @Inject('MICRO') private readonly microClient: ClientProxy,
    private filesService: FilesService,
  ) {}

  // TODO: add audio and pictures
  async create(createTrackDto: CreateTrackDto, audio?: any): Promise<Track> {
    let audioUrl = '';
    if (audio) {
      audioUrl = await this.filesService.uploadPublicFile(audio, 'name');
    }
    const track = await this.trackModel.create({
      ...createTrackDto,
      listens: 0,
      picture: 'abc',
      audio: audioUrl,
    });
    return track;
  }

  async update(id: ObjectId, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackModel.findByIdAndUpdate(id, updateTrackDto);
    return track;
  }

  async findAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    const newTracks = this.microClient.send('tracks_received', tracks);
    return newTracks as any;
  }

  async findOne(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    return track;
  }

  async remove(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async listen(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id);
    track.listens++;
    const updatedTrack = await track.save();
    return updatedTrack;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
