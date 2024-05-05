import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post }) {

  const navigate = useNavigate();

  return (
    <div className='group relative w-full bg-tree dark:bg-full-moon bg-cover border border-cyan-400 dark:border-indigo-400 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all shadow-lg shadow-cyan-400/50 dark:shadow-indigo-500/90'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-full w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2 '>
        <p className='text-lg font-semibold line-clamp-2 text-cyan-400 dark:text-purple-500'>{post.title}</p>
        <span className='italic text-sm text-white dark:text-gray-400'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-green-500 text-green-200 hover:bg-green-500 hover:text-white dark:border-indigo-500 dark:text-indigo-500 dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}