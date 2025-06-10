'use client';
import { Button } from '@mui/material';
import style from './file-dragdropzone.module.css';
import { useRef } from 'react';
import { uploadFile } from '@/actions/storage.action';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/ReactQueryClientProvider';

export default function FileDragDropZone() {
  const fileRef = useRef(null);

  const uploadIamgeMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        // invalidateQueries는 쿼리 키를 기준으로 캐시된 데이터를 무효화합니다.
        // 이 경우 'images'라는 키를 가진 쿼리의 데이터를 무효화합니다.
        // 즉, 'images' 키를 가진 쿼리의 데이터를 다시 가져오도록 합니다.
        queryKey: ['images'],
      });
    },
  });

  const onSubmitFile = async (e) => {
    e.preventDefault();
    const file = fileRef.current.files?.[0];
    console.log(file);
    if (file) {
      // formData를 만들어줘야 실제 서버랑 통신할 때 파일을 전송할 수 있습니다.
      const formData = new FormData();
      formData.append('file', file);
      try {
        const result = await uploadIamgeMutation.mutate(formData);
        console.log('파일 업로드 결과:', result);
      } catch (error) {
        console.error('업로드 실패:', error);
      }
    }
  };

  return (
    <form className={style.fileDragDropZone} onSubmit={onSubmitFile}>
      <input
        ref={fileRef}
        type="file"
        className={style.file__input}
        multiple
      />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드 하세요.</p>
      <Button
        loading={uploadIamgeMutation.isPending}
        type="submit"
        variant="contained"
      >
        파일 업로드
      </Button>
    </form>
  );
}
