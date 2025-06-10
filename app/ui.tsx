'use client';

import Search from '@/components/search';
import Logo from '@/components/logo';
import { useState } from 'react';
import FileDragDropZone from '@/components/file-dragdropzone';
import DropboxImageList from '@/components/dropbox-image-list';

export default function UI() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      {/* 로고 */}
      <Logo />

      {/* 서치 컴포넌트 */}
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* 파일 Drag&Drop Zone 컴포넌트 */}
      <FileDragDropZone />

      {/* 이미지 리스트 컴포넌트 */}
      <DropboxImageList searchInput={searchInput} />
    </div>
  );
}
