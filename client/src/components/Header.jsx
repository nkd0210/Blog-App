import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem, DropdownDivider } from 'flowbite-react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun ,FaRegMoon  } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice';
import { useState, useEffect } from 'react'
import { FaBlog } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import styled from 'styled-components';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // console.log(searchTerm)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])


  const handleSignout = async() => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: 'POST'
      })
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      }else {
        dispatch(signoutSuccess());
        navigate('/');
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  return (
    <Wrapper>
      <Navbar className='navbar flex flex-row border-b-[2px] border-gray-100  bg-[#1a1f25] dark:bg-[#1a1f25] '>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-400 via-slate-400-500 to-pink-500 rounded-lg text-red-300'>Kaydi's</span> 
          <span className='ml-[5px] text-[#778595]'>Stories</span>
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder='Searching ...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Link to='/search'>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill >
            <AiOutlineSearch />
          </Button>
        </Link>
        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 bg-transparent border-gray-600 dark:border-gray-600 hover:bg-slate-900' color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? (<IoMoonOutline className='text-white w-[30px]'/>) : (<FaSun />)}
          </Button>
          {
            currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className='block text-md' style={{color: 'lightcoral'}}>{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to='/dashboard?tab=profile'>
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button color="none" className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                  Sign In
                </Button>
              </Link>
            )
          }

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to="/">
              <p className='text-[18px] text-[#778595]    hover:text-gray-400 hover:cursor-pointer sm:hover:scale-125 transform transition-transform  '>
                Home
              </p>
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to="/about">
              <p className='text-[18px] text-[#778595]   hover:text-gray-400 hover:cursor-pointer sm:hover:scale-125 transform transition-transform  '>
                About
              </p>
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to="/projects">
              <p className='text-[18px] text-[#778595]   hover:text-gray-400 hover:cursor-pointer sm:hover:scale-125 transform transition-transform '>
                Projects
              </p>
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .navbar {
    padding-left: 150px;
    padding-right: 150px;
  }

  @media screen and (max-width: 992px) {
    .navbar {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

`