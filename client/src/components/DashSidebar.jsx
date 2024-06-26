import React from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation(); // give the access to the current URL location in the browser
  const [tab, setTab] = useState('profile');
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: 'POST'
      })
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Sidebar className='w-full md:w-56 '>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1 '>
        {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
                className="text-red-400 dark:text-purple-400"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              className='cursor-pointer text-red-400 dark:text-purple-400'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser &&
            (<Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
                className="text-red-400 dark:text-purple-400"

              >Posts</Sidebar.Item>
            </Link>)
          }
          {currentUser.isAdmin && (
            
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                className="text-red-400 dark:text-purple-400"

                >
                  Users
                </Sidebar.Item>
              </Link>
            
          )}
          {
            currentUser.isAdmin && (
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                className="text-red-400 dark:text-purple-400"

                >
                  Comments
                </Sidebar.Item>
              </Link>
            )
          }
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className="cursor-pointer text-red-700 dark:text-red-400">
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
