
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "MovieMania: Your Ultimate Movie Database",
  description: "Discover MovieMania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  openGraph: {
    title: "MovieMania: Your Ultimate Movie Database",
    description: "Discover MovieMania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  },
};

export default function Home() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <img
            src="/placeholder.svg"
            width={600}
            height={900}
            alt="Movie Poster"
            className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Movie Database</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover the latest movies, TV shows, actors, and directors. Search, browse, and explore our
              comprehensive database.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Input
                type="text"
                placeholder="Search for a movie, TV show, actor, or director"
                className="max-w-lg flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-[#87ceeb] dark:focus:ring-gray-300"
              />
              <Button size="lg" className="w-full min-[400px]:w-auto">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Movies</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the latest and greatest movies in our database.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Movie Poster"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">The Shawshank Redemption</h3>
                <p className="text-gray-400 text-sm">1994</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Movie Poster"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">The Godfather</h3>
                <p className="text-gray-400 text-sm">1972</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Movie Poster"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">The Dark Knight</h3>
                <p className="text-gray-400 text-sm">2008</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Movie Poster"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Inception</h3>
                <p className="text-gray-400 text-sm">2010</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
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
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Actor Headshot"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Tom Hanks</h3>
                <p className="text-gray-400 text-sm">Actor</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Actor Headshot"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Meryl Streep</h3>
                <p className="text-gray-400 text-sm">Actress</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Actor Headshot"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Leonardo DiCaprio</h3>
                <p className="text-gray-400 text-sm">Actor</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Actor Headshot"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Denzel Washington</h3>
                <p className="text-gray-400 text-sm">Actor</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Directors</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the most popular directors in our database.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Director Headshot"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Steven Spielberg</h3>
                <p className="text-gray-400 text-sm">Director</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false}>
              <img
                src="/placeholder.svg"
                width={300}
                height={450}
                alt="Director Headshot"
                className="aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-semibold text-white">Christopher Nolan</h3>
                <p className="text-gray-400 text-sm">Director</p>
              </div>
            </Link>
            <Link href="#" className="group relative rounded-xl overflow-hidden" prefetch={false} />
          </div>
        </div>
      </section>
    </div>
  )
}
