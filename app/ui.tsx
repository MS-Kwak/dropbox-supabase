'use client';

import { TextField, InputAdornment, Button } from '@mui/material';
import { useState } from 'react';
import Logo from '@/components/logo';
import FileDragDropZone from '@/components/file-dragdropzone';
import DropboxImageList from '@/components/dropbox-image-list';

export default function UI() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <main className="w-full p-2 flex flex-col gap-4">
      <Logo />
      <TextField
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full"
        id="outlined-basic"
        label="Search Images"
        placeholder="Search Images"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputAdornment>
            ),
          },
        }}
      />
      <FileDragDropZone />
      <DropboxImageList />
    </main>
  );
}
