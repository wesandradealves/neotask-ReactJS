/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';

export interface Song {
  id: number;
  title: string;
  youtube_link: string;
  plays: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SongResponse {
  data: Song[];
}

export const getTopSongs = async (): Promise<Song[]> => {
  try {
    const response = await api.get<SongResponse>('/songs/top');
    return response.data.data; // <-- aqui acessa o array corretamente
  } catch (error: unknown) {
    console.error('Top Songs Error:', error);
    throw error;
  }
};