import React from 'react'


export async function generateMetadata({ params }, parent) {

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: "Privacy Policy",
    openGraph: {
      title: "Privacy Policy",
      description: "Privacy Policy",
      images: ["", ...previousImages],
    },
  }
}

const PrivacyPolicy = () => {
  return (
    <div className='container'>
      <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'>Privacy Policy</h1>
      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Introduction</h2>
      <p className='text-gray-500 dark:text-gray-400'>The Entertainment Industry Foundation (EIF), a U.S. 501©(3) charitable organization, is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and share information when you visit our website at eifoundation.org and other EIF websites, SMS text messaging services, or apps that link to this Privacy Policy.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Information Collection</h2>
      <p className='text-gray-500 dark:text-gray-400'>We collect information you provide directly to us, such as when you sign up for newsletters, make donations, or participate in our programs. This may include personal information like your name, email address, and payment details.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Use of Information</h2>
      <p className='text-gray-500 dark:text-gray-400'>We use the collected information to improve our services, communicate with you, and provide relevant content. We do not sell or share your personal information with third parties without your consent.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Cookies and Tracking Technologies</h2>
      <p className='text-gray-500 dark:text-gray-400'>Our website uses cookies and similar technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Data Security</h2>
      <p className='text-gray-500 dark:text-gray-400'>We take reasonable measures to protect your information from unauthorized access, disclosure, or alteration. However, no data transmission over the internet is entirely secure.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Children&apos;s Privacy</h2>
      <p className='text-gray-500 dark:text-gray-400'>Our services are not intended for children under 13. If you believe a child has provided us with personal information, please contact us immediately.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Changes to Privacy Policy</h2>
      <p className='text-gray-500 dark:text-gray-400'>We may update this Privacy Policy periodically. Please review it regularly to stay informed about our practices.</p>

      <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-4'>Contact Us</h2>
      <p className='text-gray-500 dark:text-gray-400'>If you have any questions or concerns about our Privacy Policy, please contact us.</p>
    </div>
  )
}

export default PrivacyPolicy
