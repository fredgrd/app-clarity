import ApiService from './api-service';
import { User } from '../models/user';

class UserService extends ApiService {
  async fetchUser(): Promise<{ user?: User; error?: string }> {
    const { result: user, error } = await this.fetch<User>('user/', {
      method: 'GET',
      withCredentials: true,
    });

    return { user, error };
  }
}
