
import { fetchSitemapPersons } from "@/actions/person.action"
import { BASE_URL } from "@/lib/constants"

export default async function sitemap() {

  const array = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: BASE_URL + "peoples",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: BASE_URL + "privacy-policy",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
  const peoples = await fetchSitemapPersons()
  return [...array, ...peoples.map((people) => ({
    url: `${BASE_URL}peoples/${people.slug}`,
    lastModified: people.created_at,
    changeFrequency: 'weekly',
  }))]
}