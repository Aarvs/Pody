'use client'

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { useAudio } from '@/providers/AudioProvider';

const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const {signOut} = useClerk()
  const {audio} = useAudio()
  return (
    <div className={cn('left_sidebar h-[calc(100vh-5px)]', {
      'h-[calc(100vh-140px)]' : audio?.audioUrl
    })}>
        <nav className="flex flex-col gap-5 bg-black-4 h-full">
            <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-md:justify-center">
                <Image src="/icons/logo.svg" alt="logo" width={30} height={40}/>
                <h1 className="hidden md:block text-white-1 font-extrabold text-white max-lg:hidden">Pody</h1>
            </Link>    
            {sidebarLinks.map(({route, label, imgURL}) => {
              const isActive = pathname === route || pathname.startsWith
              (`${route}/`)
              return <Link href={route} key={label} 
      // below we use classname `cn` utility in order to wrap css inside it
              className={cn("flex gap-3 text-white-1 items-center py-4 max-md:px-4 justify-start",{
                'bg-nav-focus border-r-4 border-orange-1': isActive
              })}>
                <Image src={imgURL} alt={label} width={24} height={24}/>
                <p>{label}</p>
              </Link>
            })}
        </nav>
        <SignedOut>
          <div className="flex-center w-full pb-14 
          max-lg:px-4 lg:pr-8">
            <Button className="text-16 w-full
             bg-orange-1 font-extrabold">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex-center w-full pb-14 
          max-lg:px-4 lg:pr-8">
            <Button className="text-16 w-full
             bg-orange-1 font-extrabold" onClick={() => signOut(() => router.push('/'))}>
              Log Out
            </Button>
          </div>
        </SignedIn>
    </div>
  );
}

export default LeftSidebar;
