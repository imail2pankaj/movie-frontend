import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="container px-4 lg:px-6 py-4 flex items-center">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Image src={`/icons/logo.png`} height={60} width={60} alt="Movie Database Logo" />
        <span className="sr-only">Movie Database</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {/* <Link href="/movies" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Movies
        </Link> */}
        <Link href="/shows" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          TV Shows
        </Link>
        <Link href="/peoples" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Peoples
        </Link>
        {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link> */}
      </nav>
    </header>
  )
}

export default Header