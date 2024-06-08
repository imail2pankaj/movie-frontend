import { getPersonBySlug } from '@/actions/common.action'
import { Badge } from '@/components/ui/badge';
import { getImageURL } from '@/lib/functions';
import { parseDate } from '@/lib/utils';
import Image from 'next/image';

export async function generateMetadata({ params, searchParams }, parent) {

  const slug = params.slug

  // fetch data
  const person = await getPersonBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: person.full_name,
    openGraph: {
      title: person.full_name,
      description: person.description,
      images: [getImageURL("persons", person.image), ...previousImages],
    },
  }
}

const PersonalDetail = async ({ params: { slug } }) => {

  const person = await getPersonBySlug(slug);

  return (
    <>
      <section className="bg-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-48 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-800 dark:border-gray-700">
              <Image
                src={getImageURL("persons", person.image)}
                alt={person.full_name}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{person.full_name}</h1>
              <p className="text-gray-300 mt-2 text-sm md:text-md lg:text-xl">
                {person.bio}
              </p>
              <div className="flex items-center gap-2 mt-4">
                {person.person_type_id.map(x => <Badge className="me-1 text-xs" key={x.value}>{x.label}</Badge>)}
              </div>
              {/* <div className="flex items-center gap-2 mt-4">
              <div className="bg-gray-800 rounded-full px-3 py-1 text-xs">{person.gender}</div>
              <div className="bg-gray-800 rounded-full px-3 py-1 text-xs">Born: {parseDate(person.born)}</div>
            </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">About {person.full_name}</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                {person.description.replaceAll("\n", "<br/>")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PersonalDetail