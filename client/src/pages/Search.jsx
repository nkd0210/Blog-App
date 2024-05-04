import React from 'react'
import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });

    console.log(sidebarData);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');

        // console.log(urlParams);

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if (data.posts.length === 9) {
                    setShowMore(true);
                }else{
                    setShowMore(false);
                }
            }
        }
        fetchPosts();
    }, [location.search])

    const handleChange =  (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({ ...sidebarData, category });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }
    }

    return (
        <div className='flex flex-col md:flex-col bg-summer bg-cover dark:bg-none '>
            {/* SEARCH BAR */}
            <div className='p-7 border-b md:border-r bg-purple-100 bg-navbarWood bg-contain max-w-[900px] mx-auto my-[20px] rounded-[20px] shadow-lg border-cyan-200 shadow-cyan-500/90 dark:border-indigo-400 dark:shadow-indigo-500/90  '>
                <form className='flex flex-col lg:flex-row gap-8 mx-auto'>
                    <div className='flex items-center gap-2 w-full'>
                        <label className='whitespace-nowrap font-semibold text-gray-300'>
                            Search Term:
                        </label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                            className='min-w-[200px]'
                        />
                    </div>
                    <div className='flex items-center gap-2 w-full'>
                        <label className='font-semibold text-gray-300 '>Sort:</label>
                        <Select className='w-full' onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold text-gray-300'>Category:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.category}
                            id='category'
                            className='min-w-[150px]'
                        >
                            <option value='uncategorized'>Uncategorized</option>
                            <option value='reactjs'>React.js</option>
                            <option value='nextjs'>Next.js</option>
                            <option value='javascript'>JavaScript</option>
                            <option value='basketball'>Basketball</option>
                            <option value='html css'>HTML&CSS</option>
                            <option value='java'>Java</option>

                        </Select>
                    </div>
                    <div onClick={handleSubmit} type='submit' className='border p-[10px] min-w-[80px] text-center text-[#fff] rounded-[10px] border-gray-900 bg-[#6e6b6e] hover:text-gray-800 cursor-pointer'>
                         Filters
                    </div>
                </form>
            </div>

            {/* DISPLAY */}
            <div className="w-full flex flex-col  ">
                <h1 className='text-3xl text-center font-semibold border text-orange-300 dark:text-indigo-300 border-cyan-400 dark:border-indigo-500 p-5 mx-[20px] sm:mx-[40px] rounded-t-[50px] shadow-lg  dark:shadow-lg dark:shadow-indigo-500/90 dark:bg-sky bg-cover'>Posts Results</h1>
                <div className='flex flex-wrap justify-center align-items-center  gap-[30px] sm:gap-[50px] border mx-[20px] sm:mx-[40px] p-[30px] sm:p-[20px] rounded-b-[20px] border-cyan-200 dark:border-indigo-400 dark:shadow-lg dark:shadow-indigo-500/90 dark:bg-mystery  '>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )}
                    {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                    {!loading &&
                        posts &&
                        posts.map((post) => <PostCard key={post._id} post={post} />)}
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='text-cyan-500 text-lg hover:underline p-7 w-full'
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}




