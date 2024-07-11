import React from 'react'


import { fetchSitemapPersons } from "@/actions/person.action"
import { fetchSitemapMovies } from "@/actions/titles.action"
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function sitemaps() {

  const array = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: "/peoples",
      name: "Peoples",
    },
    {
      url: "/movies",
      name: "Movies",
    },
    {
      url: "/privacy-policy",
      name: "Privacy Policy",
    },
  ]
  const movies = await fetchSitemapMovies()
  const peoples = await fetchSitemapPersons()
  const combinations = [
    ...array,
    ...movies.map((x) => ({
      url: `/movies/${x.slug}`,
      name: x.title
    })),
    ...peoples.map((x) => ({
      url: `/peoples/${x.slug}`,
      name: x.full_name
    }))]

  return (
    <section className="pb-6 md:pb-8 lg:pb-10 my-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">Sitemap</h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {combinations.map((x, index) => (
            <Card key={index}>
              <CardHeader>
                <CardDescription>
                  <Link href={x.url}>{x.name}</Link>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}