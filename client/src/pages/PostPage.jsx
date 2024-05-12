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
    const [user, setUser] = useState({});
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
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${post.userId}`)
                const data = await res.json();
                if (res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getUser();
    }, [post])

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=6`);
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

    return (
        <Wrapper>
            <main className='p-3  flex flex-col lg:mx-[150px] mx-auto lg:mb-[50px] min-h-screen rounded-[20px]  bg-gray-100 dark:bg-[#11181f] shadow-gray-500/50 shadow-lg dark:shadow-indigo-500/90' >
                {/* TITLE */}
                <h1 className='text-3xl uppercase my-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-gray-500 dark:text-blue-400'>
                    {post && post.title}
                </h1>
                {/* AUTHOR */}
                <div className='flex flex-row align-items-center justify-center gap-[10px] '>
                    <span className=''>
                        <img src={user.profilePicture} alt="" className='max-w-[50px] max-h-[50px] w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-400 dark:border-indigo-400' />
                    </span>
                    <span className=' flex flex-col font-semibold text-gray-600 dark:text-gray-300 '>
                        <p>Author:
                            <span className='italic font-semibold ml-[5px]'>{user.username}</span>
                        </p>
                        <p>You can find me on:
                            <span className='italic font-semibold ml-[5px]'>{user.email}</span>
                        </p>
                    </span>
                </div>
                {/* CATEGORY */}
                <Link
                    to={`/search?category=${post && post.category}`}
                    className='self-center mt-5'
                >
                    <Button color='gray' pill size='xs'>
                        {post && post.category}
                    </Button>
                </Link>
                {/* CONTENT */}
                <div className="content w-full lg:px-[120px]">
                    {/* IMAGE */}
                    <div className="w-full sm:h-[200px] lg:h-[400px] rounded-lg py-5 ">
                        <img
                            src={post && post.image}
                            alt={post && post.title}
                            className='h-full w-full object-contain'
                        />
                    </div>
                    {/* INFO */}
                    <div className='flex justify-between p-3 mx-auto w-full  text-md text-red-600 dark:text-blue-400'>
                        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className='italic'>
                            {post && (post.content.length / 1000).toFixed(0)} mins read
                        </span>
                    </div>
                    {/* BODY */}
                    <div
                        className='p-3 w-full mx-auto post-content'
                        dangerouslySetInnerHTML={{ __html: post && post.content }}
                    ></div>


                    {/* RECENT POSTS */}
                    <div className='flex flex-col justify-center items-center my-5 '>
                        <h1 className='text-2xl uppercase text-black dark:text-blue-400 mt-[20px]'>Recent articles</h1>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 justify-center items-center mx-auto'>
                            {recentPosts && recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                        </div>
                    </div>



                    {/* COMMENT */}
                    <CommentSection postId={post._id} postTitle={post.title} />

                </div>

                <BackToTopButton />
            </main>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    
`

