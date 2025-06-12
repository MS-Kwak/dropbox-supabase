'use client';
import { CircularProgress } from '@mui/material';
import style from './file-dragdropzone.module.css';
import { useCallback, useRef } from 'react';
import { uploadFile } from '@/actions/storage.action';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { useDropzone } from 'react-dropzone';

export default function FileDragDropZone() {
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

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    // const file = acceptedFiles?.[0];
    if (acceptedFiles.length > 0) {
      // formData를 만들어줘야 실제 서버랑 통신할 때 파일을 전송할 수 있습니다.
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        console.log('드래그 앤 드롭된 파일:', file);
        formData.append(file.name, file);
      });

      try {
        const result = await uploadIamgeMutation.mutate(formData);
        console.log('파일 업로드 결과:', result);
      } catch (error) {
        console.error('업로드 실패:', error);
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div className={style.fileDragDropZone} {...getRootProps()}>
      <input {...getInputProps()} className={style.file__input} />
      {uploadIamgeMutation.isPending ? (
        <CircularProgress size={24} />
      ) : isDragActive ? (
        <p>파일을 여기에 놓아주세요.</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드 하세요.</p>
      )}
    </div>
  );
}
