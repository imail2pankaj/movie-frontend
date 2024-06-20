
import FilterBar from './_component/FilterBar';
import { getGenres } from '@/actions/common.action';
import LoadMore from './_component/LoadMore';
import MovieCard from '@/components/MovieCard';
import { fetchFilteredRecordsPagination } from '@/actions/titles.action';

const Movies = async ({ searchParams }) => {

  const q = searchParams?.q || '';
  const released_year = searchParams?.released_year || '';
  const genreIds = searchParams?.genres ? searchParams.genres.split(',').map(Number) : [];

  const { records } = await fetchFilteredRecordsPagination({ query: q, genre_id: genreIds, released_year, currentPage: 1 });

  const genres = await getGenres({});

  return (
    <>
      <section className="py-3 md:py-4 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Movies</h1>
        </div>
      </section>
      <FilterBar genres={genres} />
      <section className="py-3 md:py-4 lg:py-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {records.map((record, index) => {
              return (
                <MovieCard
                  index={index}
                  key={record.id}
                  title={record}
                />
              );
            })}
          </div>
        </div>
        <LoadMore key={q + released_year + genreIds.join()} q={q} released_year={released_year} genreIds={genreIds} />
      </section>
    </>
  );
};

export default Movies;
