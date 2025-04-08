"use client";
import { Container } from "./styles";
import { Title } from "@/app/(home)/style";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { sendSuggestion } from "@/services/suggestionService";
import { useSession } from "next-auth/react";

type SuggestForm = {
  youtube_link: string;
};

export default function Suggest({ title }: { title: string }) {
  const { register, handleSubmit, reset } = useForm<SuggestForm>();
  const { data: session } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data: SuggestForm) => {
    try {
      setError(null);
      setSuccess(false);
  
      if (!session?.accessToken) {
        setError("Você precisa estar logado para sugerir uma música.");
        return;
      }
  
      const result = await sendSuggestion(
        { youtube_link: data.youtube_link },
        session.accessToken!
      );
  
      if ('error' in result) {
        setError(result.error);
        return;
      }
  
      setSuccess(true);
      reset();
    } catch (err: any) {
      console.error('Erro não tratado:', err);
      setError("Erro inesperado ao enviar sugestão.");
    }
  }, [session?.accessToken, session, reset]);
  
  return (
    <Container id="suggest">
      <div className="container max-w-[768px] m-auto py-6 flex flex-col gap-4">
        <Title className="font-bold text-sm lg:text-md">{title}</Title>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <input
            {...register("youtube_link", { required: true })}
            type="text"
            placeholder="Link do YouTube"
            className="flex-1 border px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {success && (
          <span className="text-green-600 text-sm">
            Sugestão enviada com sucesso!
          </span>
        )}
        {error && (
          <span className="text-red-600 text-sm">
            {error}
          </span>
        )}
      </div>
    </Container>
  );
}
