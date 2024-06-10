"use client"

import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import PeopleType from './PeopleType'
import { getPersonTypes } from '@/actions/common.action';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const FilterBar = ({ types }) => {

  const form = useForm({
    resolver: zodResolver(z.object({
      q: z.string(),
      // types: z.array(z.object({
      //   id: z.string(),
      //   title: z.string(),
      // })),
      types: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    })),
    defaultValues: {},
  })

  const onSubmit = (data) => {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <div className='container flex items-center gap-2'>
          <FormField
            control={form.control}
            name={'q'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id={'q'}
                    placeholder={'Search People...'}
                    type={'search'}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <PeopleType types={types.map(x => ({id:x.id, label:x.title}))} control={form.control} />
        </div>
      </form>
    </Form>
  )
}

export default FilterBar
