/* eslint-disable @typescript-eslint/no-explicit-any */

import api from './api';

export type SuggestionPayload = {
  youtube_link: string;
  accessToken: string;
};

export interface SuggestionResponse {
  message: string;
}

export const sendSuggestion = async (
  payload: SuggestionPayload
): Promise<SuggestionResponse | { error: string }> => {
  try {
    const response = await api.post<SuggestionResponse>('/suggestions', payload);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Erro ao enviar sugestão.';
    return { error: message };
  }
};