
export function getImageURL(folder, image) {

  if (image) {
    return `${process.env.NEXT_PUBLIC_IMAGE_UPLOADED_URL}${folder}/${image}`;
  }

  return '/placeholder.webp';
}

export const convertRunTime = (n) => `${Math.floor(n / 60)}h ${n % 60}m`;
