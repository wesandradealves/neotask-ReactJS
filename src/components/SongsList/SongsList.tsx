import { useEffect, useState } from "react";
import { Title, Item, ListWrapper, SongTitle, Views, Sorter } from "@/app/(home)/style";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import classNames from "classnames";
import Link from "next/link";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Song } from "@/services/songService";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface SongListProps {
  title: string;
  songs: Song[];
  placeholderCount?: number;
  pagination?: PaginationProps; // Torna a paginação opcional
}


export const ItemInner = styled(Paper)(({ }) => ({
  borderRadius: 8,
  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.1),0px 1px 3px 0px rgba(0,0,0,0.12)'
}));

export default function SongList({ title, songs, placeholderCount = 5, pagination }: SongListProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };


  useEffect(() => {
    console.log(pagination)
  }, [pagination]);

  return (
    <section>
      <div className="container max-w-[768px] m-auto py-6 flex flex-col gap-4">
        <Title className="font-bold text-sm lg:text-md flex items-center justify-between">
          {title}
          <Sorter onClick={toggleSortOrder} className="flex items-center gap-1 text-xs text-zinc-600 hover:underline">
            Ordenar por plays
            {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
          </Sorter>
        </Title>

        {songs && songs.length === 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(placeholderCount)].map((_, i) => (
              <article key={i} role="status" className="space-y-4 animate-pulse flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded dark:bg-gray-700">
                  <svg
                    className="w-6 h-6 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <>
            <ListWrapper
              className={classNames(
                "list-none flex gap-4",
                sortOrder === 'asc' ? "flex-col-reverse" : "flex-col"
              )}
            >
              {songs.map((song, index: number) => (
                <Item data-id={song.id} key={index}>
                  <ItemInner className="py-6 px-4 flex items-center flex-wrap gap-8" elevation={1}>
                    <SongTitle className="font-bold flex-1 text-sm lg:text-md flex flex-col gap-1">
                      <Link href={song.youtube_link}>{song.title}</Link>
                      <Views className="text-xs font-normal text-zinc-400">{song.plays} visualizaçoes</Views>
                    </SongTitle>
                  </ItemInner>
                </Item>
              ))}
            </ListWrapper>

            {pagination && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="text-sm text-zinc-600 hover:underline disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-sm text-zinc-600">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
                <button
                  onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="text-sm text-zinc-600 hover:underline disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}