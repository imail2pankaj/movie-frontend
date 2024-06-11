import { fetchFilteredPersons, fetchFilteredPersonsPagination } from '@/actions/person.action'
import PersonCard from '@/components/PersonCard'
import React from 'react'
import FilterBar from './_component/FilterBar'
import { getPersonTypes } from '@/actions/common.action'
// import { useSearchParams } from 'next/navigation'

export async function generateMetadata({ params }, parent) {

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: "Meet the Stars Behind the Scenes",
    openGraph: {
      title: "Meet the Stars Behind the Scenes",
      description: "Step into the limelight with Spotlight Central, your exclusive access to the world's most talented actors, visionary directors, and innovative producers. Discover the faces that shape our stories and the minds that bring them to life. Connect with the creators, explore their works, and find inspiration in every frame. Join us at Movie Masti Magic – where every role matters, and every story counts",
      images: [...previousImages],
    },
  }
}

const Peoples = async ({ searchParams }) => {

  const q = searchParams?.q || "";

  const typeIds = searchParams?.type ? searchParams.type.split(",").map(Number) : [];

  const { persons } = await fetchFilteredPersonsPagination({ query: q, person_type_id: typeIds });
// console.log(persons)
  const types = await getPersonTypes({});

  return (
    <>
      <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Peoples</h1>
        </div>
      </section>
      <FilterBar types={types} />
      <section className="py-3 md:py-4 lg:py-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {persons.map((person) => <PersonCard key={person.id} person={person} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default Peoples 
