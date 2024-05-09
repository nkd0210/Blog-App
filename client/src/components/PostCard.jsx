import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function PostCard({ post }) {

  const navigate = useNavigate();

  return (
    // <div className='group relative max-w-[320px] border border-gray-400 dark:border-indigo-400 hover:border-2 h-[200px] overflow-hidden rounded-lg sm:w-[430px] transition-all '>
    //   <Link to={`/post/${post.slug}`}>
    //     <img
    //       src={post.image}
    //       alt='post cover'
    //       className='h-full w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
    //     />
    //   </Link>
    //   <div className='p-3 flex flex-col gap-2 '>
    //     <p className='text-lg font-semibold line-clamp-2 text-gray-600 dark:text-purple-500'>{post.title}</p>
    //     <span className='italic text-sm text-gray-400 dark:text-white'>{post.category}</span>
    //     <Link
    //       to={`/post/${post.slug}`}
    //       className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
    //     >
    //       Read article
    //     </Link>
    //   </div>
    // </div>
    <Wrapper>
      <div className=' max-w-[350px]  '>
        <div className='w-[350px] h-[180px] rounded-t-[20px] overflow-hidden'>
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image}
              alt='post cover'
              className='h-full w-full object-cover '
            />
          </Link>
        </div>
        <div className='flex flex-col border border-t-0 border-gray-500 p-[20px] rounded-b-[20px]'>
          <p className='text-[16px] font-semibold'>{post.title}</p>
          <span className=''>{post.category}</span>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  
`