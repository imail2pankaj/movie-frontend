"use server"

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const buildQuery = ({ query, type, release_year, genre_id }) => {
  const querySplit = query.split(" ");
  const queryBuilder = [];

  const columns = [
    'title',
  ]

  columns.forEach(c => {
    // querySplit.forEach(q => {
    queryBuilder.push(
      { [c]: { contains: query } },
    )
    // });
  });

  const where = { status: "Publish" };
  if (query) {
    where["OR"] = queryBuilder;
  }

  if (type) {
    where["type"] = type;
  }

  if (release_year) {
    where["year"] = release_year;
  }

  if (genre_id && genre_id.length) {
    where["genres_in_titles"] = { some: { genre_id: { in: genre_id } } };
  }

  return where;
}

export async function getRecords() {
  return await prisma.titles.findMany({
    // include: {
    //   person_types_in_persons: {
    //     include: {
    //       person_types: true
    //     }
    //   }
    // }
  });
}

export async function fetchFilteredRecords({ query, type, released_year, currentPage, column, sort, genre_id, page_size = 12 }) {

  return await prisma.titles.findMany({
    select: {
      id: true,
      title: true,
      type: true,
      details: true,
      created_at: true,
      status: true,
      slug: true,
      image: true,
      genres_in_titles: {
        include: {
          genres: true
        }
      },
    },
    where: buildQuery({ query, type, genre_id }),
    skip: currentPage !== 1 ? ((currentPage - 1) * page_size) : 0,
    take: page_size,
    orderBy: { [column]: sort },
  });
}

export async function fetchFilteredRecordsCount({ query, type, released_year, genre_id }) {
  return await prisma.titles.count({
    where: buildQuery({ query, type, released_year, genre_id })
  });
}

export async function fetchFilteredRecordsPagination({ query, type, released_year, currentPage, column, sort, genre_id, page_size = 12 }) {
  return {
    records: await fetchFilteredRecords({ query, currentPage, type, released_year, column, sort, genre_id, page_size }),
    totalRecords: await fetchFilteredRecordsCount({ query, type, released_year, genre_id })
  };
}

export async function getRecord(id) {
  const record = await prisma.titles.findFirst({
    where: { id },
    include: {
      genres_in_titles: {
        include: {
          genres: true
        }
      },
      persons_in_person_type_in_titles: {
        include: {
          persons: true
        }
      }
    },
  })
  return {
    ...record,
    genres_in_titles: [],
    genre_id: record?.genres_in_titles?.map(({ genres }) => ({
      label: genres.title,
      value: Number(genres.id),
    })),
    persons_in_person_type_in_titles: [],
    writer_id: (record.persons_in_person_type_in_titles.filter(per => per.as_role === 'Writer')).map(per => ({ value: Number(per.persons.id), label: per.persons.full_name })),
    director_id: (record.persons_in_person_type_in_titles.filter(per => per.as_role === 'Director')).map(per => ({ value: Number(per.persons.id), label: per.persons.full_name }))
  };
}

export async function getRecordBySlug(slug) {
  const record = await prisma.titles.findFirst({
    where: { slug },
    include: {
      genres_in_titles: {
        include: {
          genres: true
        }
      },
      persons_in_person_type_in_titles: {
        include: {
          persons: true
        }
      }
    },
  })
  // console.log(record)

  const casts = record.persons_in_person_type_in_titles.filter(per => per.as_role === 'Stars' || per.as_role === 'Cast');

  return {
    ...record,
    genres_in_titles: [],
    genre_id: record?.genres_in_titles?.map(({ genres }) => ({
      label: genres.title,
      value: Number(genres.id),
    })),
    persons_in_person_type_in_titles: [],
    casts: casts.sort((a, b) => a.credit - b.credit).map(per => (
      {
        value: Number(per.persons.id),
        label: per.persons.full_name,
        image: per.persons.image,
        slug: per.persons.slug,
        as_role: per.as_role,
        title: per.title,
      }
    )),
    writer_id: (
      record.persons_in_person_type_in_titles.filter(per => per.as_role === 'Writer')
    ).map(per => (
      {
        value: Number(per.persons.id),
        label: per.persons.full_name,
        image: per.persons.image,
        slug: per.persons.slug,
        as_role: per.as_role,
        title: per.title,
      }
    )),
    director_id: (
      record.persons_in_person_type_in_titles.filter(per => per.as_role === 'Director')
    ).map(per => (
      {
        value: Number(per.persons.id),
        label: per.persons.full_name,
        image: per.persons.image,
        slug: per.persons.slug,
        as_role: per.as_role,
        title: per.title,
      }))
  };
}


export async function fetchSitemapMovies() {

  return await prisma.titles.findMany({
    select: {
      id: true,
      slug: true,
      created_at: true,
    },
    where: { status: "Publish" },
    take: 1000,
    orderBy: { id: "asc" },
  });
}