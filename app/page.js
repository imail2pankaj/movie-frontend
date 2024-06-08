
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getPopularPersons } from "@/actions/common.action";
import HeroSection from "./_components/Home/HeroSection";
import PopularMovies from "./_components/Home/PopularMovies";
import PopularPersons from "./_components/Home/PopularPersons";

export const metadata = {
  title: "MovieMania: Your Ultimate Movie Database",
  description: "Discover MovieMania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  openGraph: {
    title: "MovieMania: Your Ultimate Movie Database",
    description: "Discover MovieMania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  },
};

export default async function Home() {

  const persons = await getPopularPersons(["Actress","Actor"]);

  const movies = await getPopularPersons(["Producer"]);

  return (
    <div>
      <HeroSection />
      <PopularMovies movies={movies} />
      <PopularPersons persons={persons} />
    </div>
  )
}
