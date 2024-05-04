import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

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
    <div className=' bg-summerBeach dark:bg-mystery bg-contain p-[5px] md:p-[12px] lg:py-[20px] lg:px-0'>
      {/* HERO */}
      <div className='flex flex-col gap-6 p-[22px] lg:p-28 mb-[20px] max-w-6xl mx-auto border border-cyan-300 dark:border-indigo-400 rounded-[10px] shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-indigo-500/90 bg-summer dark:bg-sky bg-cover '>
        <h1 className='text-3xl font-bold lg:text-6xl text-cyan-500 dark:text-purple-500'>Welcome to my Blog</h1>
        <p className='text-white text-[18px] dark:text-gray-200 text-md'>
         Here, I share stories about my life, my hoobies and also some project codes I have done , inviting you to explore the worlds I create through words and lines of code. Join with me on this journey of discovery and inspiration!
        </p>
        <Link
          to='/search'
          className='text-md text-white font-semibold'
        >
          <div className="bg-orange-300 dark:bg-indigo-400 max-w-[150px] text-center rounded-[5px] p-[5px] hover:bg-cyan-400 hover:text-orange-400 dark:hover:text-indigo-700 hover:font-bold hover:scale-x-105 tranform transition-transform">
            View all posts
          </div>
        </Link>
      </div>

      {/* CALL TO ACTION */}
      <div className='p-3 bg-blue-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      {/* RECENT POSTS */}
      <div className='w-full mx-auto p-[10px] gap-8 py-7 '>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-[26px] font-semibold text-center text-cyan-300 dark:text-purple-400 '>Recent Posts</h2>
            <div className='flex justify-center flex-wrap gap-[30px] sm:gap-[50px] border mx-[20px] sm:mx-[40px] p-[30px] sm:p-[20px] rounded-[20px] border-cyan-200 dark:border-indigo-400 dark:shadow-lg dark:shadow-indigo-500/90'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-xl text-cyan-300 dark:text-indigo-500 hover:underline text-center'
            >
                View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}