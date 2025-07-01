// https://nscxysomwthwjrjskmhs.supabase.co/storage/v1/object/public/dropbox//puppy2.png

export function getImageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

  if (!baseUrl || !bucketName) {
    throw new Error('Supabase URL or Storage Bucket is not defined');
  }

  return `${baseUrl}/storage/v1/object/public/${bucketName}/${path}`;
}
