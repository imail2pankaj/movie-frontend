"use server"

// import fileUpload, { deleteFile, generateFileName } from "@/lib/file-upload";
import prisma from "@/lib/prisma";

const buildQuery = ({ query, status, person_type_id }) => {
  const querySplit = query.split(" ");
  const queryBuilder = [];

  const columns = [
    'full_name',
    'slug',
    'bio',
    'description'
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

  if (person_type_id) {
    where["person_types_in_persons"] = { some: { person_type_id: { in: person_type_id } } };
  }

  return where;
}

export async function createPerson(content) {
  let fileName = "";
  if (content.image) {
    fileName = generateFileName(content.image, content.full_name)
  }
  const person = await prisma.persons.create({
    data: {
      full_name: content.full_name,
      slug: content.slug,
      born: content.born,
      birth_place: content.birth_place,
      bio: content.bio,
      birth_name: content.birth_name,
      nick_names: content.nick_names,
      height: content.height,
      description: content.description,
      gender: content.gender,
      status: content.status,
      image: fileName,
    },
  });
  const person_types_in_persons = [];

  content.person_type_id.map(type => {
    person_types_in_persons.push({
      person_type_id: type.value,
      person_id: person.id,
    })
  })

  await prisma.person_types_in_persons.createMany({
    data: person_types_in_persons,
  });

  if (content.image) {
    fileUpload({ image: content.image, image_name: fileName, folder: 'persons' })
  }
  return person;
}

export async function updatePerson(id, content) {
  let fileName = "";
  if (content.image) {
    fileName = generateFileName(content.image, content.full_name)
  }
  const person = await prisma.persons.update({
    where: { id },
    data: {
      full_name: content.full_name,
      slug: content.slug,
      born: content.born,
      birth_place: content.birth_place,
      bio: content.bio,
      birth_name: content.birth_name,
      nick_names: content.nick_names,
      height: content.height,
      description: content.description,
      gender: content.gender,
      status: content.status,
      image: fileName,
    },
  });

  await prisma.person_types_in_persons.deleteMany({
    where: { person_id: id },
  });

  const person_types_in_persons = [];

  content.person_type_id.map(type => {
    person_types_in_persons.push({
      person_type_id: type.value,
      person_id: person.id,
    })
  })

  await prisma.person_types_in_persons.createMany({
    data: person_types_in_persons,
  });
  if (content.image) {
    fileUpload({ image: content.image, image_name: fileName, folder: 'persons', old_image: content?.old_image })
  }
  return person;
}

export async function deletePerson(recordId) {
  const person = await getPerson(recordId);
  if (person.image) {
    deleteFile({ image_name: person.image, folder: "persons" })
  }
  await prisma.person_types_in_persons.deleteMany({ where: { person_id: recordId } });
  return await prisma.persons.delete({ where: { id: recordId } });
}

export async function getPersons() {
  return await prisma.persons.findMany({
    include: {
      person_types_in_persons: {
        include: {
          person_types: true
        }
      }
    }
  });
}

export async function fetchFilteredPersons({ query = "", currentPage = 1, column = 'created_at', sort = 'desc', pageSize = 12 }) {

  return await prisma.persons.findMany({
    select: {
      id: true,
      full_name: true,
      bio: true,
      created_at: true,
      status: true,
      slug: true,
      image: true,
      born: true,
      gender: true,
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
    where: buildQuery({ query }),
    skip: currentPage !== 1 ? ((currentPage - 1) * pageSize) : 0,
    take: pageSize,
    orderBy: { [column]: sort },
  });
}

export async function fetchFilteredPersonsCount({ query, person_type_id }) {
  return await prisma.persons.count({
    where: buildQuery({ query, person_type_id })
  });
}

export async function fetchFilteredPersonsPagination({ query, currentPage, column, sort, person_type_id, page_size = 10 }) {
  return {
    persons: await fetchFilteredPersons({ query, currentPage, column, sort, person_type_id, page_size }),
    totalRecords: await fetchFilteredPersonsCount({ query, person_type_id })
  };
}

export async function getPerson(id) {
  const person = await prisma.persons.findFirst({
    where: { id },
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


export async function fetchSitemapPersons() {

  return await prisma.persons.findMany({
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
