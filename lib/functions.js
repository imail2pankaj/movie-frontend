
export function getImageURL(folder, image) {

  if (image) {
    return `${process.env.NEXT_PUBLIC_IMAGE_UPLOADED_URL}${folder}/${image}`;
  }

  return '/placeholder.webp';
}


export function calculateAge(birthdate) {
  const today = new Date();
  const age = today.getFullYear() - birthdate.getFullYear() - (
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
  );
  return age;
}

export const convertRunTime = (n) => `${Math.floor(n / 60)}h ${n % 60}m`;

export const setPersonSortingOption = (slug) => {

  if (slug === 'z-a') {
    return {
      column: 'full_name',
      sort: 'desc',
    }
  } else if (slug === 'a-z') {
    return {
      column: 'full_name',
      sort: 'asc',
    }
  } else if (slug === 'youngest') {
    return {
      column: 'born',
      sort: 'desc',
    }
  } else if (slug === 'oldest') {
    return {
      column: 'born',
      sort: 'asc',
    }
  } else {
    return {
      column: 'full_name',
      sort: 'asc',
    }
  }
}

export const setTitleSortingOption = (slug) => {

  if (slug === 'z-a') {
    return {
      column: 'title',
      sort: 'desc',
    }
  } else if (slug === 'a-z') {
    return {
      column: 'title',
      sort: 'asc',
    }
  } else if (slug === 'youngest') {
    return {
      column: 'release_date',
      sort: 'desc',
    }
  } else if (slug === 'oldest') {
    return {
      column: 'release_date',
      sort: 'asc',
    }
  } else {
    return {
      column: 'release_date',
      sort: 'asc',
    }
  }
}