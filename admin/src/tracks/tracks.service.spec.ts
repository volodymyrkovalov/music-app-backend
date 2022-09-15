import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Track } from './schemas/track.schema';
import { TracksService } from './tracks.service';

describe('TracksService', () => {
  let service: TracksService;

  let tracks;

  const mockTracksModel = {
    create: jest.fn((dto) => ({ _id: Date.now(), ...dto })),
    save: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracksService,
        {
          provide: getModelToken('Track'),
          useValue: mockTracksModel,
        },
      ],
    }).compile();

    service = module.get<TracksService>(TracksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', async () => {
    const track = {
      name: 'abc',
      artist: 'abc',
      text: 'abc',
    };

    expect(await service.create(track)).toEqual({
      _id: expect.any(Number),
      artist: 'abc',
      audio: 'abc',
      listens: 0,
      name: 'abc',
      picture: 'abc',
      text: 'abc',
    });
  });
});
