import { getClient } from './client';
import { UserProfile } from './types';

export async function getUserProfile(): Promise<UserProfile> {

    const client = await getClient();

    return await client.get('/user/profile', {
        errorMessage: 'Failed to fetch user profile',
    });
  }