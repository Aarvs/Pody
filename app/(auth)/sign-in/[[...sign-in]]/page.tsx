import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-center glassmorphism-auth w-full">
        <SignIn/>
    </div>
  )
}

export default Page