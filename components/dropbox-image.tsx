'use client';

import { deleteFile } from '@/actions/storage-actions';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { getImageUrl } from '@/utils/supabase/storage';
import { CircularProgress, IconButton } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      // Invalidate the query to refetch the list of images
      queryClient.invalidateQueries({
        queryKey: ['searchImages'],
      });
    },
  });

  return (
    <div className="w-full flex flex-col gap-2 p-2 border border-gray-300 rounded-xl relative">
      <Image
        src={getImageUrl(image.name)}
        alt="Dropbox Image"
        className="!w-full aspect-square object-cover"
        width={500}
        height={300}
      />
      <div>{image.name}</div>

      <IconButton
        className="!absolute top-4 right-4"
        aria-label="Delete Image"
        onClick={async () => {
          if (
            confirm('Are you sure you want to delete this image?')
          ) {
            await deleteFileMutation.mutateAsync(image.name);
          }
        }}
      >
        {deleteFileMutation.isPending ? (
          <CircularProgress />
        ) : (
          <i className="fas fa-trash text-red-500"></i>
        )}
      </IconButton>
    </div>
  );
}
