'use client';

import { uploadFile } from '@/actions/storage-actions';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileDragDropZone() {
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['searchImages'],
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
        const result = await uploadImageMutation.mutateAsync(
          formData
        );
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
    <div
      className="border-4 border-dotted border-slate-500 flex flex-col items-center justify-center py-20"
      {...getRootProps()}
    >
      <input {...getInputProps()} className="" />
      {uploadImageMutation.isPending ? (
        <CircularProgress size={24} />
      ) : isDragActive ? (
        <p>파일을 여기에 놓아주세요.</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드 하세요.</p>
      )}
    </div>
  );
}
