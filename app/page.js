
import { getPopularPersons } from "@/actions/common.action";
import PopularMovies from "./_components/Home/PopularMovies";
import PopularPersons from "./_components/Home/PopularPersons";
import Browse from "./_components/Home/Browse";
import SearchSection from "./_components/Home/SearchSection";
import Birthdays from "./_components/Home/Birthdays";
import UpcomingMovies from "./_components/Home/UpcomingMovies";

export const metadata = {
  title: "MMM : Movie Magic Mania | Your Ultimate Movie Database",
  description: "Discover MMM : Movie Magic Mania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  openGraph: {
    title: "MMM : Movie Magic Mania | Your Ultimate Movie Database",
    description: "Discover MMM : Movie Magic Mania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  },
};

export default async function Home() {

  const persons = await getPopularPersons(["Actress", "Actor"]);

  return (
    <div>
      {/* <HeroSection /> */}
      <Browse />
      <SearchSection />
      <UpcomingMovies />
      <PopularMovies />
      <PopularPersons persons={persons.length ? persons : []} />
      <Birthdays />
      {/* <div className="container"><AdBanner dataAdSlot="6944255980" dataAdFormat="auto" dataFullWidthResponsive={true} pId="ca-pub-6282693958918202" /></div> */}
    </div>
  )
}
