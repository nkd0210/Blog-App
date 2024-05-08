import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import BackToTopButton from '../components/BackToTopButton';
import styled from 'styled-components'

export default function PostPage() {

    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
          const fetchRecentPosts = async () => {
            const res = await fetch(`/api/post/getposts?limit=4`);
            const data = await res.json();
            if (res.ok) {
              setRecentPosts(data.posts);
            }
          };
          fetchRecentPosts();
        } catch (error) {
          console.log(error.message);
        }
      }, []);


    if (loading)
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );

        //bg-gradient-to-r from-pink-200 to-blue-200 dark:from-orange-100 dark:to-purple-300
    return (
        <Wrapper>
         <main className='p-3 flex flex-col max-w-6xl mx-auto my-3 min-h-screen rounded-[20px] bg-summerBeach dark:bg-mystery bg-contain shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-indigo-500/90' >
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-cyan-400 dark:text-purple-500'>
                {post && post.title}
            </h1>
            <Link
                to={`/search?category=${post && post.category}`}
                className='self-center mt-5'
            >
                <Button color='gray' pill size='xs'>
                    {post && post.category}
                </Button>
            </Link>
            <div className="w-full sm:h-[200px] lg:h-[400px] rounded-lg py-5 ">
                <img
                    src={post && post.image}
                    alt={post && post.title}
                    className='h-full w-full object-contain'
                />
            </div>
            <div className='flex justify-between p-3 mx-auto w-full max-w-2xl text-md text-red-600 dark:text-blue-400'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className='p-3 max-w-2xl mx-auto w-full post-content border rounded-[10px] border-gray-400 dark:border-indigo-400 bg-opacity-50 backdrop-blur-md'
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>
            <div className=' mx-auto w-full mt-[20px]'>
                <CallToAction />
            </div>
            <CommentSection postId={post._id} postTitle={post.title} />

            <div className='flex flex-col justify-center items-center my-5 border shadow-lg border-cyan-200 shadow-cyan-500/90 dark:border-indigo-400 dark:shadow-indigo-500/90 rounded-t-[50px] p-[20px] bg-summer bg-cover dark:bg-sky'>
                <h1 className='text-2xl text-green-400 dark:text-indigo-400 mt-[20px]'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center items-center mx-auto'>
                    {recentPosts && recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>

            <BackToTopButton />
         </main>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    
`

