'use server';

import { createServerSupabaseClient } from '@/utils/supabase/server';

const handleError = (error) => {
  console.error(error);
  throw new Error(error.message);
};

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const file = formData.get('file') as File;

  console.log('서버 업로드 요청:', file);

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    // upsert는 insert와 update를 합친 말인데, 만약 이 파일.네임으로 파일이 존재한다면 업데이트를 할거고요, 파일.네임으로 파일이 존재하지 않는다면 인서트를 할 겁니다.
    // path, 실제file, 옵션
    .upload(file.name, file, { upsert: true });

  console.log('업로드 결과', { data, error });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function searchFiles(searchInput: string = '') {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, {
      search: searchInput,
    });

  if (error) {
    handleError(error);
  }

  return data;
}
