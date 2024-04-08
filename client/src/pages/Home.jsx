import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl text-pink-400 dark:text-blue-500'>Welcome to my Blog</h1>
        <p className='text-gray-600 dark:text-gray-200 text-md'>
         Here, I share stories about my life, my hoobies and also some project codes I have done , inviting you to explore the worlds I create through words and lines of code. Join with me on this journey of discovery and inspiration!
        </p>
        <Link
          to='/search'
          className='text-md text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-blue-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='w-full mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center text-red-300 dark:text-purple-400 '>Recent Posts</h2>
            <div className='flex justify-center flex-wrap gap-4 mx-auto '>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-xl text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}