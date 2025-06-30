'use client';

import { IconButton } from '@mui/material';
import Image from 'next/image';

export default function DropboxImage() {
  return (
    <div className="w-full flex flex-col gap-2 p-2 border border-gray-300 rounded-xl relative">
      <Image
        src="/puppy1.png"
        alt="Dropbox Image"
        className="!w-full aspect-square object-cover"
        width={500}
        height={300}
      />
      <div>puppy1.png</div>

      <IconButton
        className="!absolute top-4 right-4"
        aria-label="Delete Image"
      >
        <i className="fas fa-trash text-red-500"></i>
      </IconButton>
    </div>
  );
}
