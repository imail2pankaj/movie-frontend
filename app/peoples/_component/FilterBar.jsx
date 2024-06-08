import { Input } from '@/components/ui/input'
import React from 'react'
import PeopleType from './PeopleType'
import { getPersonTypes } from '@/actions/common.action';

const FilterBar = async () => {

  const types = await getPersonTypes();

  return (
    <div className='container flex items-center gap-2'>
      <Input className="w-100" placeholder="Filter peoples..." />
      <PeopleType types={types} />
    </div>
  )
}

export default FilterBar
