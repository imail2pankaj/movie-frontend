import { getPersonBySlug } from '@/actions/common.action'
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getImageURL } from '@/lib/functions';
import { parseDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }, parent) {

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
      <section className="bg-gray-900 text-white py-6 md:py-8 lg:py-10">
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
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">About {person.full_name}</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: person.description.replaceAll('\n', '<br/>'),
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {person.nick_names.trim() && <Card>
              <CardHeader>
                <CardTitle>Other Names</CardTitle>
                <CardDescription>{person.nick_names}</CardDescription>
              </CardHeader>
            </Card>}
            <Card>
              <CardHeader>
                <CardTitle>Born</CardTitle>
                <CardDescription>{parseDate(person.born)} | {person.birth_place}</CardDescription>
              </CardHeader>
            </Card>
            {person.birth_name.trim() && <Card>
              <CardHeader>
                <CardTitle>Birth Name</CardTitle>
                <CardDescription>{person.birth_name}</CardDescription>
              </CardHeader>
            </Card>}
            {person.died && <Card>
              <CardHeader>
                <CardTitle>Died</CardTitle>
                <CardDescription>{parseDate(person.died)} | {person.death_place}</CardDescription>
              </CardHeader>
            </Card>}
            {person.height.trim() && <Card>
              <CardHeader>
                <CardTitle>Height</CardTitle>
                <CardDescription>{person.height}</CardDescription>
              </CardHeader>
            </Card>}
          </div>
        </div>
      </section>
      {person.person_links.length > 0 && <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">External Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {person.person_links.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <CardTitle><Link target='_blnk' href={link.link}>{link.title}</Link></CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>}
    </>
  )
}

export default PersonalDetail