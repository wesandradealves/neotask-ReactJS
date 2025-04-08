'use client';

import Header from "@/components/header/header";
import { useMetadata } from "@/hooks/useMetadata";

export default function Template({ children }: { children: React.ReactNode }) {
  useMetadata({
    title: `Tiao Carreiro & Pardinho`,
    ogTitle: `Tiao Carreiro & Pardinho`,
  });

  return (
    <>
      <Header />
      <main className='flex-1'>
        {children}
      </main>
    </>
  );
}
