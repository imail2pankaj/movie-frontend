"use server"

import prisma from "@/lib/prisma";

export const getPopularPersons = async (personTypes) => {
  try {
    return await prisma.persons.findMany({
      select: {
        id: true,
        full_name: true,
        slug: true,
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
