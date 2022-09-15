import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      // Put config in `.env`
      clientID:
        '252722068311-logt9a8a2gdmbeca75bgkkt88eqrnume.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { emails } = profile;

    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern, learn more here: https://docs.nestjs.com/techniques/database

    const user = await this.usersService.create({
      email: emails[0].value,
    });
    return user;
  }
}
