import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AlbumsService } from './albums.service';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { RenameAlbumDto } from './dto/rename-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  rename(@Param('id') id: ObjectId, @Body() updateAlbumDto: RenameAlbumDto) {
    return this.albumsService.rename(id, updateAlbumDto);
  }

  @Patch(':id')
  addTrack(
    @Param('id') id: ObjectId,
    @Body() addTrackToAlbumDto: AddTrackToAlbumDto,
  ) {
    return this.albumsService.addTrack(id, addTrackToAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.albumsService.remove(id);
  }
}
