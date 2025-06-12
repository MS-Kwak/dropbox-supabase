'use client';

import Image from 'next/image';
import style from './dropbox-image.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImageUrl } from '@/utils/supabase/storage';
import { useMutation } from '@tanstack/react-query';
import { deleteFile } from '@/actions/storage.action';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { IconButton, CircularProgress } from '@mui/material';

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
  });

  const onClickDelete = () => {
    deleteFileMutation.mutate(image.name);
  };

  return (
    <div className={style.DropboxImage}>
      <Image
        src={getImageUrl(image.name)}
        alt="puppy"
        width={200}
        height={200}
        priority
        className={style.DropboxImage__thumbnail}
      />
      <div>{image.name}</div>
      <IconButton
        aria-label="delete"
        onClick={onClickDelete}
        className={style.delete}
      >
        {deleteFileMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          <DeleteIcon />
        )}
      </IconButton>
    </div>
  );
}
