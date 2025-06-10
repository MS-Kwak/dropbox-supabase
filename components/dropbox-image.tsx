'use client';

import Image from 'next/image';
import style from './dropbox-image.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImageUrl } from '@/utils/supabase/storage';

export default function DropboxImage({ image }) {
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
      <DeleteIcon className={style.delete} />
    </div>
  );
}
