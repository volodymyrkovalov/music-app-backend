import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TracksService } from '../tracks/tracks.service';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { RenameAlbumDto } from './dto/rename-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private readonly tracksService: TracksService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumModel.create(createAlbumDto);
    return album;
  }

  async findAll() {
    const albums = await this.albumModel.find();
    return albums;
  }

  async findOne(id: ObjectId) {
    const album = await this.albumModel.findById(id);
    return album;
  }

  async rename(id: ObjectId, updateAlbumDto: RenameAlbumDto) {
    const album = await this.albumModel.findByIdAndUpdate(id, updateAlbumDto);
    return album;
  }

  async addTrack(id: ObjectId, addTrackToAlbumDto: AddTrackToAlbumDto) {
    const album = await this.albumModel.findById(id);
    const track = await this.tracksService.findOne(addTrackToAlbumDto.track);
    album.tracks.push(track);
    const updatedAlbum = await album.save();
    return updatedAlbum;
  }

  async remove(id: ObjectId) {
    const album = await this.albumModel.findByIdAndDelete(id);
    return album._id;
  }
}
