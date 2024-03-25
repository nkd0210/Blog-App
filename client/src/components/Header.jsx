import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem, DropdownDivider } from 'flowbite-react'
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-400 via-slate-400-500 to-pink-500 rounded-lg text-white'>Kaydi's</span>Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder='Searching ...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill >
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color="gray" pill onClick={() => dispatch(toggleTheme())}>
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
              <DropdownItem>Sign out</DropdownItem>
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
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
