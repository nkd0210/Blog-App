import React from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'

export default function DashSidebar() {
  const location = useLocation(); // give the access to the current URL location in the browser
  const [tab, setTab] = useState('profile');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' className='cursor-pointer'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
