'use client';

import Image from 'next/image';
import style from './logo.module.css';

export default function Logo() {
  return (
    <div className={style.Logo}>
      {/* 로고 이미지와 텍스트 */}
      <Image
        src="/dropbox_icon.png"
        alt="Logo"
        width={24}
        height={22}
      />
      <span>Dropbox</span>
    </div>
  );
}
