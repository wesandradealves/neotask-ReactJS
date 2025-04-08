"use client";
import { useCallback, useEffect, useState } from "react";
import { getTopSongs, Song, getSongs } from "@/services/songService";
import Suggest from "@/components/suggest/suggest";
import SongList from "@/components/SongsList/SongsList";

export default function Home() {
  const [topSongs, setTopSongs] = useState<Song[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [songsPage, setSongsPage] = useState(1);
  const [songsTotalPages, setSongsTotalPages] = useState(0);

  const loadTopSongs = useCallback(async () => {
    try {
      const response = await getTopSongs(); 
      setTopSongs(response);
    } catch (err) {
      console.error("Erro ao buscar top músicas:", err);
    }
  }, []);

  const loadSongs = useCallback(async (page: number, sort_dir?: string) => {
    try {
      const response = await getSongs(6, 5, page, sort_dir); 
      if(response) {
        setSongs(response.data);
        setSongsTotalPages(Math.ceil(response.total / response.per_page));
      }
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
    }
  }, []);

  useEffect(() => {
    loadTopSongs();
    loadSongs(songsPage);
  }, [loadTopSongs, loadSongs]);

  useEffect(() => {
    loadSongs(songsPage);
  }, [songsPage]);

  return (
    <>
      <Suggest title={"Sugerir nova música"} />
      <SongList
        title="Top 5"
        songs={topSongs}
      />
      <SongList
        title="Músicas Recentes"
        songs={songs}
        pagination={{
          currentPage: songsPage,
          totalPages: songsTotalPages,
          onPageChange: setSongsPage,
        }}
      />
    </>
  );
}