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

  return {
    title: `Popular Movie - ${record.title}`,
    openGraph: {
      title: record.title,
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
                alt={record.title}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{record.title}</h1>
              <p className="text-gray-300 mt-2 text-sm md:text-md lg:text-xl"
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
                <CardDescription>{convertRunTime( record.run_time)}</CardDescription>
              </CardHeader>
            </Card>}
            {/* {record?.birth_name?.trim() && <Card>
              <CardHeader>
                <CardTitle>Birth Name</CardTitle>
                <CardDescription>{record.birth_name}</CardDescription>
              </CardHeader>
            </Card>}
            {record?.height?.trim() && <Card>
              <CardHeader>
                <CardTitle>Height</CardTitle>
                <CardDescription>{record.height}</CardDescription>
              </CardHeader>
            </Card>} */}
          </div>
        </div>
      </section>
      {/* {record.person_links.length > 0 && <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">External Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {record.person_links.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <CardTitle><Link target='_blnk' href={link.link}>{link.title}</Link></CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>} */}
    </>
  )
}

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