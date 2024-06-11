import { getImageURL } from '@/lib/functions'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'

const PersonCard = ({ person }) => {
  return (
    <Link href={`/peoples/${person.slug}`} className="group relative rounded-xl overflow-hidden" prefetch={false}>
      <Image
        src={getImageURL("persons", person.image)}
        width={500}
        height={450}
        alt={person.full_name}
        className="aspect-[3/4] md:aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
        <h3 className="text-lg font-semibold text-white">{person.full_name}</h3>
        {person.person_types_in_persons && person.person_types_in_persons.map(type => <Badge key={`${type.person_id}-${type.person_type_id}`} className="me-1 text-xs">{type.person_types.title}</Badge>)}
      </div>
    </Link>
  )
}

export default PersonCard