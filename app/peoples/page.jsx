"use client"
import React, { useState, useEffect, useRef } from 'react';
import { fetchFilteredPersonsPagination } from '@/actions/person.action';
import PersonCard from '@/components/PersonCard';
import FilterBar from './_component/FilterBar';
import { getPersonTypes } from '@/actions/common.action';

const Peoples = ({ searchParams }) => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const lastPersonRef = useRef(null);

  useEffect(() => {
    const loadPersons = async () => {
      // Save reference to the last person element
      const lastPersonElement = lastPersonRef.current;

      const q = searchParams?.q || '';
      const born = searchParams?.born || '';
      const typeIds = searchParams?.type ? searchParams.type.split(',').map(Number) : [];
      const data = await fetchFilteredPersonsPagination({ query: q, person_type_id: typeIds, born, currentPage: page });
console.log(data)
      setPersons(prevPersons => [...prevPersons, ...data.persons]);

      // Scroll to the last person element after new data is rendered
      if (lastPersonElement) {
        lastPersonElement.scrollIntoView({
          behavior: 'auto',
          block: 'end',
        });
      }
    };

    loadPersons();
  }, [searchParams, page]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting) {
      console.log(page,'------------------------------------------');
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      {/* ... rest of your component */}
      <section className="py-3 md:py-4 lg:py-5 min-h-[100vh]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {persons.map((person, index) => {
              // Set ref on the last person element
              const isLastElement = index === persons.length - 1;
              return (
                <PersonCard
                  index={index}
                  key={person.id}
                  person={person}
                  ref={isLastElement ? lastPersonRef : undefined}
                />
              );
            })}
          </div>
        </div>
      </section>
      <div ref={loader} />
    </>
  );
};

export default Peoples;




// const [types, setTypes] = useState([]);
// useEffect(() => {
//   const loadPersonsTypes = async () => {
//     const data = await getPersonTypes({});
//     setTypes(data);
//   };

//   loadPersonsTypes();
// }, []);



// import { fetchFilteredPersonsPagination } from '@/actions/person.action'
// import PersonCard from '@/components/PersonCard'
// import FilterBar from './_component/FilterBar'
// import { getPersonTypes } from '@/actions/common.action'

// export async function generateMetadata({ params }, parent) {

//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: "Meet the Stars Behind the Scenes",
//     openGraph: {
//       title: "Meet the Stars Behind the Scenes",
//       description: "Step into the limelight with Spotlight Central, your exclusive access to the world's most talented actors, visionary directors, and innovative producers. Discover the faces that shape our stories and the minds that bring them to life. Connect with the creators, explore their works, and find inspiration in every frame. Join us at Movie Masti Magic – where every role matters, and every story counts",
//       images: [...previousImages],
//     },
//   }
// }

// const Peoples = async ({ searchParams }) => {

//   const q = searchParams?.q || "";
//   const born = searchParams?.born || "";

//   const typeIds = searchParams?.type ? searchParams.type.split(",").map(Number) : [];

//   const { persons } = await fetchFilteredPersonsPagination({ query: q, person_type_id: typeIds, born });

//   const types = await getPersonTypes({});

//   return (
//     <>
//       <section className="py-6 md:py-8 lg:py-10">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
//           <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Peoples</h1>
//         </div>
//       </section>
//       <FilterBar types={types} />
//       <section className="py-3 md:py-4 lg:py-5">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
//             {persons.map((person, index) => <PersonCard index={index} key={person.id} person={person} />)}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Peoples 
