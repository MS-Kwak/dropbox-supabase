'use client';

import { useQuery } from '@tanstack/react-query';
import DropboxImage from './dropbox-image';
import style from './dropbox-image-list.module.css';
import { searchFiles } from '@/actions/storage.action';
import { CircularProgress } from '@mui/material';

export default function DropboxImageList({ searchInput }) {
  const searchImageQuery = useQuery({
    queryKey: ['images', searchInput],
    queryFn: () => searchFiles(searchInput),
  });

  return (
    <section className={style.dropboxImageList}>
      {searchImageQuery.isLoading && <CircularProgress size={30} />}
      {searchImageQuery.data &&
        searchImageQuery.data.map((image) => (
          <DropboxImage key={image.id} image={image} />
        ))}
    </section>
  );
}
