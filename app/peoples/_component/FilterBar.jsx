"use client"

import { Input } from '@/components/ui/input'
import PeopleType from './PeopleType'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const FilterBar = ({ types }) => {

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

  return (
    <div className='container flex items-center gap-2'>
      <Input
        id={'q'}
        placeholder={'Search People...'}
        type={'search'}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('q')?.toString()}
      />
      <PeopleType types={types.map(x => ({ id: x.id, label: x.title }))} />
    </div>
  )
}

export default FilterBar
