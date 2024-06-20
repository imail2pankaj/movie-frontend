"use client"

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';
import Genres from './Genres';

const FilterBar = ({ genres }) => {

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleClearAll = () => {
    params.delete("page")
    params.delete("q")
    params.delete("genres")
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='container px-4 lg:px-8'>
      <div className='flex justify-start items-center gap-2'>
        <Input
          className={'w-40'}
          id={'q'}
          placeholder={'Search Movies...'}
          type={'search'}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('q')?.toString()}
        />
        <Genres genres={genres.map(x => ({ id: x.id, label: x.title }))} />
          {/* <Button variant="outline" onClick={() => handleClearAll()}>Clear Filters</Button> */}
      </div>
    </div>
  )
}

export default FilterBar
