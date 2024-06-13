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

  if (!bdays) {
    return null;
  }

  return (
    <div className="container mb-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Birthdays</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Check out the birthday peoples in our database.
          </p>
        </div>
      </div>
      <div className=" p-6 ">
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
                          className="aspect-[1/1] md:aspect-[1/1] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="mt-4 text-center">
                        <Link href={`/peoples/${_.slug}`} prefetch={false}>
                          <h3 className="text-md font-bold text-gray-900 dark:text-gray-50">
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
    </div>
  )
}

export default Birthdays