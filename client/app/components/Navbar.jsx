'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiCompassDiscoverLine } from "react-icons/ri";
import { PiArrowCircleUpLeftLight } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import Cookies from 'js-cookie';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter()
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tokenValue = Cookies.get('token')
    const usernameValue = Cookies.get('username')
    
    setToken(tokenValue)
    setUsername(usernameValue)
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const logout = () => {
    Cookies.remove('username')
    Cookies.remove('token')
    setToken('')
    setUsername('')
    router.push('/')
    
  }

  return (
    <div className='flex mt-6 mb-8'>
      <div className='flex w-1/2 '>
        <div className='flex items-center gap-2'>
          <IoIosAirplane className='bg-purple-900 rounded-full text-2xl text-white' />
          <Link href="/" className='title text-xl'>PLANE SCAPE</Link>
        </div>
      </div>

      <div className='flex justify-end w-1/2 gap-4'>
        <div className='flex items-center gap-1'>
          <PiArrowCircleUpLeftLight className='text-xl bg-purple-900 text-white rounded-full'/>
          <Link href="/deals" className='content font-medium'>Deals</Link>
        </div>
        <div className='flex items-center gap-1'>
          <RiCompassDiscoverLine className='text-xl bg-purple-900 text-white rounded-full' />
          <Link href="/discover" className='content font-medium'>Discover</Link>
        </div>
        <div className='flex gap-1 items-center'>
          <FaUserCircle className='text-xl bg-purple-900 text-white rounded-full' />
          {token ? (
            <div className='flex gap-4'>
              <Link href="/my-flights" className='content font-medium'>
                {username}
              </Link>
              <button onClick={() => logout()} className='content font-medium'>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className='content font-medium'>
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
