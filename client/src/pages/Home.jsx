import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import BackToTopButton from '../components/BackToTopButton';
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);


  return (
    <Wrapper className=' p-[5px] md:p-[12px] lg:py-[20px] lg:px-0 bg-white dark:bg-[#182029]  '>
      {/* BANNER  */}
      <div className="moving-text mb-[20px] flex text-white border max-w-[500px] border-indigo-400 rounded-[20px] p-[5px] bg-indigo-400 shadow-lg shadow-indigo-500/30 ">
        <span className='mx-[5px]'><FaStar className='w-[20px] text-indigo-500' /></span>
          Everything you need is here
        <span className='mx-[5px]'><FaStar className='w-[20px] text-indigo-500' /></span>
        <span>~~~</span>
        <span className='mx-[5px]'><FaStar className='w-[20px] text-indigo-500' /></span>
         Please enjoy it
        <span className='mx-[5px]'><FaStar className='w-[20px] text-indigo-500' /></span>

      </div>

      {/* HERO */}
      <div className='sm:mx-[30px] flex flex-col gap-6 p-[22px] lg:p-28 mb-[20px] max-w-full border border-gray-300 dark:border-indigo-400 rounded-[10px] shadow-lg shadow-gray-500/90 dark:shadow-lg dark:shadow-indigo-500/90 bg-summer dark:bg-sky bg-cover'>
        <h1 className='text-3xl font-bold lg:text-6xl text-white dark:text-indigo-400 '>Welcome to my Blog</h1>
        <p className='text-white text-[18px] dark:text-gray-200 text-md '>
          Here, I share stories about my life, my hoobies and also some project codes I have done , inviting you to explore the worlds I create through words and lines of code. Join with me on this journey of discovery and inspiration!
        </p>
        <Link
          to='/search'
          className='text-md text-white font-semibold'
        >
          <div className="bg-indigo-400 max-w-[150px] text-center rounded-[5px] p-[5px] hover:text-indigo-700 hover:font-bold hover:scale-x-105 tranform transition-transform">
            View all posts
          </div>
        </Link>
      </div>

      {/* CALL TO ACTION */}
      <div className='sm:mx-[30px] sm:py-[10px]  max-w-full  '>
        <CallToAction />
      </div>

      {/* RECENT POSTS */}
      <div className='max-w-full gap-8 py-7 sm:mx-0'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-[26px] font-semibold text-center text-gray-600 dark:text-purple-400 '>Recent Posts</h2>
            <div className='flex justify-center flex-wrap gap-[30px] sm:gap-[50px] border mx-[20px] sm:mx-[40px] p-[30px] sm:p-[20px] rounded-[20px] border-gray-300 dark:border-indigo-400 shadow-lg shadow-gray-500/50 dark:shadow-indigo-500/90 bg-gray-100 dark:bg-[#11181f]'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-[16px] px-[5px] font-semibold text-white hover:no-underline max-w-[200px] rounded-[10px] mx-auto bg-indigo-400  text-center p-[5px]  dark:hover:text-indigo-600 hover:font-bold hover:scale-x-105 tranform transition-transform'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>

      <BackToTopButton />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .moving-text {
    position: relative;
    animation: moveRight 15s linear infinite;
    display: flex;
    align-items: center;
  }

  @keyframes moveRight {
    0% {
      left: 0;
    }
    100% {
      left: calc(100% - 100px); /* Change 100px to adjust the width of the moving text */
    }
  }


`