import ApiService from './api.service';
import { User } from '../../models/user.model';
import { ApiError } from '../../models/api-error.model';

class UserService extends ApiService {
  async fetchUser(): Promise<{ user?: User; error?: string }> {
    const { result: user, error } = await this.fetch<User>('user/', {
      method: 'GET',
      withCredentials: true,
    });
    return { user, error };
  }

  async signinWithCredentials(
    email: string,
    password: string
  ): Promise<{ user?: User; error?: string }> {
    const { result: user, error } = await this.fetch<User>('auth/signin', {
      method: 'POST',
      withCredentials: true,
      body: {
        email,
        password,
      },
    });

    if (error) {
      // PARSE
      switch (error) {
        case ApiError.BadData:
          return { error: 'The credentials appear to be incorrect' };
        default:
          return { error: 'Ops.. something went wrong' };
      }
    }

    return { user, error };
  }

  async signinWithToken(
    token: string
  ): Promise<{ user?: User; error?: string }> {
    const { result: user, error } = await this.fetch<User>('auth/signin', {
      method: 'POST',
      withCredentials: true,
      body: {
        token,
      },
    });

    if (error) {
      // PARSE
      switch (error) {
        case ApiError.InvalidToken:
          return { error: 'The token appears to be no longer valid' };
        default:
          return { error: 'Ops.. something went wrong' };
      }
    }

    return { user, error };
  }
}

export default UserService;
