import api from './api';

export interface SuggestionPayload {
  youtube_link: string;
}

export interface SuggestionResponse {
  message: string;
}

// export const sendSuggestion = async (
//   payload: SuggestionPayload, accessToken: string): Promise<SuggestionResponse> => {
//   try {
//     await api.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, { withCredentials: true });

//     const response = await api.post<SuggestionResponse>(
//       '/suggestions',
//       payload
//     );

//     return response.data;
//   } catch (error: unknown) {
//     console.error('Suggestion Error:', error);

//     const message =
//       (error as any)?.response?.data?.message || 'Erro ao enviar sugestão.';
//     throw new Error(message);
//   }
// };

export const sendSuggestion = async (
  payload: SuggestionPayload,
  accessToken: string
): Promise<SuggestionResponse | { error: string }> => {
  try {
    await api.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`);

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
