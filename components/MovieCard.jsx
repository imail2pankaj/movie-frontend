import { getImageURL } from '@/lib/functions'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { MotionDiv } from "./MotionDiv";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MovieCard = ({ title, index = 1 }) => {
  return (
    <Link href={`/titles/${title.slug}`} className="group relative rounded-xl overflow-hidden" prefetch={false}>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: index * 0.2,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
      >
      <Image
        src={getImageURL("titles", title.image)}
        width={500}
        height={450}
        alt={title.title}
        loading='lazy'
        className="aspect-[3/4] md:aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
        <h3 className="text-lg font-semibold text-white">{title.title}</h3>
        {title.genres_in_titles && title.genres_in_titles.map(type => <Badge key={`${type.genre_id}-${type.title_id}`} className="me-1 text-xs">{type.genres.title}</Badge>)}
      </div>
    </MotionDiv>
      </Link >
  )
}

export default MovieCard