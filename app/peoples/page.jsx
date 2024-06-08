import { fetchFilteredPersons } from '@/actions/person.action'
import PersonCard from '@/components/PersonCard'
import React from 'react'


export async function generateMetadata({ params }, parent) {

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: "Peoples",
    openGraph: {
      title: "Peoples",
      description: "Peoples",
      images: [...previousImages],
    },
  }
}

const Peoples = async () => {

  const persons = await fetchFilteredPersons({});

  return (
    <>
      <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Peoples</h1>
        </div>
      </section>
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
