"use client";
import { useCallback, useEffect, useState } from "react";
import { getTopSongs, Song, getSongs } from "@/services/songService";
import Suggest from "@/components/suggest/suggest";
import SongList from "@/components/SongsList/SongsList";

export default function Home() {
  const [topSongs, setTopSongs] = useState<Song[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  const loadTopSongs = useCallback(async () => {
    try {
      const songs = await getTopSongs();
      setTopSongs(songs);
    } catch (err) {
      console.error("Erro ao buscar top músicas:", err);
    }
  }, []);

  const loadSongs = useCallback(async () => {
    try {
      const songs = await getSongs(6, 5);
      setSongs(songs.data);
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
    }
  }, []);

  useEffect(() => {
    loadTopSongs();
    loadSongs();
  }, [loadTopSongs, loadSongs]);

  return (
    <>
      <Suggest title={"Sugerir nova música"} />
      <SongList title="Top 5" songs={topSongs.map(song => ({ ...song, id: song.id.toString() }))} />
      <SongList title="Músicas Recentes" songs={songs.map(song => ({ ...song, id: song.id.toString() }))} />
    </>
  );
}