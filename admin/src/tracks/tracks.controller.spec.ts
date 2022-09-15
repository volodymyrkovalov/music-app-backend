import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongoose';
import { Track } from './schemas/track.schema';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

describe('TracksController', () => {
  let controller: TracksController;

  let tracks;

  const mockTrackService = {
    create: jest.fn((dto) => {
      const track = {
        _id: Date.now(),
        ...dto,
      };
      tracks.push(track);
      return track;
    }),

    findAll: jest.fn((dto) => tracks),

    remove: jest.fn((id) => {
      console.log(id);
      tracks = tracks.filter((track) => track._id !== id);
      console.log(tracks);
      return id;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [
        TracksService,
        { provide: getModelToken(Track.name), useValue: jest.fn() },
      ],
    })
      .overrideProvider(TracksService)
      .useValue(mockTrackService)
      .compile();

    controller = module.get<TracksController>(TracksController);

    tracks = [
      {
        _id: 'sjofgosijg',
        name: 'sjf',
        artist: 'fojg',
        text: 'jfg',
        listens: 5,
        picture: 'gfg',
        audio: 'sfjog',
        comments: [],
      },
    ];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of tracks', async () => {
    expect(await controller.findAll(5, 0)).toBe(tracks);
    expect(tracks).toHaveLength(1);
  });

  it('should add a track', async () => {
    const createdTrack = await controller.create({
      name: 'abc',
      artist: 'jjf',
      text: 'dhfh',
    });
    expect(createdTrack).toEqual({
      _id: expect.any(Number),
      name: 'abc',
      artist: 'jjf',
      text: 'dhfh',
    });
    expect(tracks).toHaveLength(2);
    expect(mockTrackService.create).toHaveBeenCalledWith({
      name: 'abc',
      artist: 'jjf',
      text: 'dhfh',
    });
  });

  it('should delete a track', async () => {
    const id = 'sjofgosijg';
    expect(controller.remove(id as any)).toEqual(id);
    expect(tracks).toHaveLength(0);
  });
});
