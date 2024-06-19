import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='border-t border-gray-800'>
      <div className='container my-8 mx-auto border-t-1'>
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Image src={`/icons/logo.png`} height={60} width={60} alt="Movie Database Logo" />
          <span className="sr-only">Movie Database</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 w-full justify-center my-8">
          {/* <Link href="/movies" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Movies
        </Link> */}
          <Link href="/shows" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            TV Shows
          </Link>
          <Link href="/peoples" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Peoples
          </Link>
          <Link href="/privacy-policy" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link> */}
        </nav>
      </div>
    </div>
  )
}

export default Footer