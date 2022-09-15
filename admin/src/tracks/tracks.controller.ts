import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  CacheInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import Express from 'express';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  create(@Body() createTrackDto: CreateTrackDto, @UploadedFile() audio?) {
    return this.tracksService.create(createTrackDto, audio);
  }

  @Get()
  findAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.tracksService.findAll(count, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.tracksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.tracksService.remove(id);
  }

  @Post('listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.tracksService.listen(id);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.tracksService.search(query);
  }
}
