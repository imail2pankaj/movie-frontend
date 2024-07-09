import { getRecordBySlug } from '@/actions/titles.action';
import MovieJSONLD from '@/components/MovieJSONLD';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BASE_URL } from '@/lib/constants';
import { convertRunTime, getImageURL } from '@/lib/functions';
import { parseDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }, parent) {

  const slug = params.slug

  // fetch data
  const record = await getRecordBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  const title = record.genre_id.map(x => `Popular ${x.label} ${record.type} ${record.title}`).join(" | ");

  return {
    title: title,
    openGraph: {
      title: title,
      description: record.details,
      images: [getImageURL("records", record.image), ...previousImages],
    },
  }
}

const MovieDetails = async ({ params: { slug } }) => {

  const record = await getRecordBySlug(slug);

  return (
    <>
      <MovieJSONLD record={record} />
      <section className="bg-gray-900 text-white py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-48 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-800 dark:border-gray-700">
              <Image
                src={getImageURL("titles", record.image)}
                alt={record.genre_id.map(x => `Popular ${x.label} ${record.title}, Best ${x.label} ${record.title}`).join(" | ")}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{record.title}</h1>
              <p className='text-sm'>({record.year})</p>
              <p className="text-gray-300 mt-2 text-sm md:text-md lg:text-lg"
                dangerouslySetInnerHTML={{
                  __html: record.details.replaceAll('\n', '<br/>'),
                }}>
              </p>
              <div className="flex items-center gap-2 mt-4">
                {record.genre_id.map(x => <Link href={`/movies?type=${x.value}`} key={x.value}><Badge className="me-1 text-xs">{x.label}</Badge></Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">{record.title} {record.type} Story</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: record.story.replaceAll('\n', '<br/>'),
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">Movie Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {record.release_date && <Card>
              <CardHeader>
                <CardTitle>Release Date</CardTitle>
                <CardDescription>{parseDate(record.release_date)}</CardDescription>
              </CardHeader>
            </Card>}
            {record?.run_time?.trim() && <Card>
              <CardHeader>
                <CardTitle>Run Time</CardTitle>
                <CardDescription>{convertRunTime(record.run_time)}</CardDescription>
              </CardHeader>
            </Card>}
          </div>
        </div>
      </section>
      <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">Casts & Crew</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-8">
            {record.director_id.map((person) => <CastCrewCard person={person} key={person.id} />)}
            {record.writer_id.map((person) => <CastCrewCard person={person} key={person.id} />)}
            {record.casts.map((person) => <CastCrewCard person={person} key={person.id} />)}
          </div>
        </div>
      </section>
    </>
  )
}
const CastCrewCard = ({ person }) =>
  <Card>
    <CardHeader className="text-center p-2">
      <CardTitle>
        <Link
          aria-label={`${person.full_name} movies, ${person.full_name} songs, ${person.full_name} shows `}
          href={`/peoples/${person.slug}`}
          className='flex flex-col text-center gap-2'
        >
          <Image
            src={getImageURL("persons", person.image)}
            height={120}
            width={120}
            alt={`${person.full_name} movies, ${person.full_name} songs, ${person.full_name} shows `}
            className='rounded-full aspect-[1/1] object-cover'
          />
          <p className='text-sm md:text-md'>{person.label}</p>
        </Link>
      </CardTitle>
      <CardDescription className='text-xs md:text-sm'>{person.title ? person.title : person.as_role}</CardDescription>
    </CardHeader>
  </Card>

export default MovieDetails

{/* <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "actor": [
    {
      "@type": "Person",
      "name": "Johnny Depp"
    },
    {
      "@type": "Person",
      "name": "Penelope Cruz"
    },
    {
      "@type": "Person",
      "name": "Ian McShane"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "bestRating": "10",
    "ratingCount": "200",
    "ratingValue": "8",
    "reviewCount": "50"
  },
  "author": [
    {
      "@type": "Person",
      "name": "Ted Elliott"
    },
    {
      "@type": "Person",
      "name": "Terry Rossio"
    }
  ],
  "description": "Jack Sparrow and Barbossa embark on a quest to find the elusive fountain of youth, only to discover that Blackbeard and his daughter are after it too.",
  "director": {
    "@type": "Person",
    "name": "Rob Marshall"
  },
  "name": "Pirates of the Carribean: On Stranger Tides (2011)"
}
</script> */}