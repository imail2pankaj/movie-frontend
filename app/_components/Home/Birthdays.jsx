import { fetchPersonsBirthdayToday } from "@/actions/person.action";
import PersonCard from "@/components/PersonCard";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getImageURL } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";

const Birthdays = async () => {
  const bdays = await fetchPersonsBirthdayToday();

  return (
    <div className="container mb-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {bdays.map((_, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
              <div className="col-span-3 sm:col-span-1">
                <Card className="">
                  <CardContent className="flex flex-col items-center justify-center px-0">
                    <Link href={`/peoples/${_.slug}`} prefetch={false}>
                      <Image
                        src={getImageURL("persons", _.image)}
                        width={300}
                        height={200}
                        alt={_.full_name}
                        className="aspect-[3/4] md:aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="mt-4 text-center">
                      <Link href={`/peoples/${_.slug}`} prefetch={false}>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                          {_.full_name}
                        </h3>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Birthdays