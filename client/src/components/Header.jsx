import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem, DropdownDivider } from 'flowbite-react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun ,FaRegMoon  } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice';
import { useState, useEffect } from 'react'
import { FaBlog } from "react-icons/fa";

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
    <Navbar className='border-b-2 border-gray-900 bg-blue-100 bg-woodDark bg-contain'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-400 via-slate-400-500 to-pink-500 rounded-lg text-red-300'>Kaydi's</span> 
        <span className='ml-[5px] text-green-300 dark:text-indigo-400'>Stories</span>
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
        <Button className='w-12 h-10  hidden sm:inline bg-transparent border-gray-400 hover:bg-slate-900 dark:hover-bg-orange-400' color="gray" pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? (<FaMoon />) : (<FaSun />)}
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
            <p className='text-[18px] text-green-300 dark:text-indigo-400   hover:text-cyan-500  dark:hover:text-purple-400 hover:cursor-pointer sm:hover:scale-125 transform transition-transform  '>
              Home
            </p>
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">
            <p className='text-[18px] text-green-300 dark:text-indigo-400   hover:text-cyan-500  dark:hover:text-purple-400 hover:cursor-pointer sm:hover:scale-125 transform transition-transform  '>
              About
            </p>
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to="/projects">
            <p className='text-[18px] text-green-300 dark:text-indigo-400   hover:text-cyan-500  dark:hover:text-purple-400 hover:cursor-pointer sm:hover:scale-125 transform transition-transform '>
              Projects
            </p>
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
