
export function getImageURL(folder, image) {

  if (image) {
    return `${process.env.NEXT_PUBLIC_IMAGE_UPLOADED_URL}${folder}/${image}`;
  }

  return '/placeholder.webp';
}