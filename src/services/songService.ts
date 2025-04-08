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
  page(page: any): unknown;
  map(arg0: (song: any) => { id: any; title: any; youtube_link: any; plays: any; }): Song[];
  songs: never[];
  data: Song[];
  total: number;
  per_page: number;
  offset: number;
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

// Nova função para buscar músicas com offset e paginação
export const getSongs = async (offset: number = 0, perPage: number = 10, page: number = 1, sort_dir: string = 'asc'): Promise<SongResponse> => {
  try {
    const response = await api.get<SongResponse>('/songs', {
      params: {
        sort_dir: sort_dir,
        offset,
        page: page,
        per_page: perPage,
      },
    });
    return response.data; // Retorna a resposta completa com dados, total, etc.
  } catch (error: unknown) {
    console.error('Get Songs Error:', error);
    throw error;
  }
};