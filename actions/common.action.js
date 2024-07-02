"use server"

import prisma from "@/lib/prisma";

export const getPopularPersons = async (personTypes) => {
  try {
    return await prisma.persons.findMany({
      select: {
        id: true,
        full_name: true,
        slug: true,
        bio: true,
        image: true,
        person_types_in_persons: {
          select: {
            person_type_id: true,
            person_id: true,
            person_types: {
              select: {
                id: true,
                title: true,
              }
            }
          }
        }
      },
      where: {
        status: "Publish",
        person_types_in_persons: {
          some: {
            person_types: {
              title: {
                in: personTypes
              },
            },
          }
        },
      },
      take: 4,
      orderBy: { ['id']: 'desc' },
    });
  } catch (error) {
    return error
  }
}


export async function getPersonBySlug(slug) {
  const person = await prisma.persons.findFirst({
    where: { slug, status: "Publish" },
    include: {
      person_types_in_persons: {
        include: {
          person_types: true
        }
      },
      person_links: true
    },
  })

  return {
    ...person,
    person_types_in_persons: [],
    person_type_id: person?.person_types_in_persons?.map(ptype => ({
      label: ptype.person_types.title,
      value: Number(ptype.person_types.id),
    }))
  };
}

export const getPersonTypes = async () => {
  try {
    return await prisma.person_types.findMany();
  } catch (error) {
    return error
  }
}

export const getGenres = async () => {
  try {
    return await prisma.genres.findMany();
  } catch (error) {
    return error
  }
}


export async function getPopularMovies() {

  return await prisma.titles.findMany({
    include: {
      genres_in_titles: {
        include: {
          genres: true
        }
      },
    },
    where: { status: "Publish" },
    orderBy: { ['release_date']: 'desc' },
    take: 4
  });
}

export async function getUpcomingMovies(date) {

  return await prisma.titles.findMany({
    include: {
      genres_in_titles: {
        include: {
          genres: true
        }
      },
    },
    where: {
      status: "Publish",
      release_date: {
        gte: date
      }
    },
    take: 10
  });
}