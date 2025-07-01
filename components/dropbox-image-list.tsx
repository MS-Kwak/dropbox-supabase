'use client';

import { useQuery } from '@tanstack/react-query';
import DropboxImage from './dropbox-image';
import { searchFiles } from '@/actions/storage-actions';
import { CircularProgress } from '@mui/material';

export default function DropboxImageList({ searchInput }) {
  const searchImagesQuery = useQuery({
    queryKey: ['searchImages', searchInput],
    queryFn: () => searchFiles(searchInput),
  });

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {searchImagesQuery.isLoading && <CircularProgress />}
      {searchImagesQuery.data &&
        searchImagesQuery.data?.map((image) => (
          <DropboxImage key={image.id} image={image} />
        ))}
    </section>
  );
}
