import PersonCard from '@/components/PersonCard'
import { Badge } from '@/components/ui/badge'
import { getImageURL } from '@/lib/functions'
import Image from 'next/image'
import Link from 'next/link'

const PopularPersons = ({ persons }) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Actors</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out the most popular actors in our database.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {persons.map((person) => <PersonCard key={person.id} person={person} />)}
        </div>
      </div>
    </section>
  )
}

export default PopularPersons