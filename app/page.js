
import { getPopularMovies, getPopularPersons } from "@/actions/common.action";
import HeroSection from "./_components/Home/HeroSection";
import PopularMovies from "./_components/Home/PopularMovies";
import PopularPersons from "./_components/Home/PopularPersons";
import Browse from "./_components/Home/Browse";
import SearchSection from "./_components/Home/SearchSection";
import Birthdays from "./_components/Home/Birthdays";

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

  const movies = await getPopularMovies();

  return (
    <div>
      {/* <HeroSection /> */}
      <Browse />
      <SearchSection />
      <PopularMovies movies={movies.length ? movies : []} />
      <PopularPersons persons={persons.length ? persons : []} />
      <Birthdays />
    </div>
  )
}
