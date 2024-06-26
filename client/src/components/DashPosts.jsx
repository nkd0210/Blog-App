import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Modal, Table, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {

  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('')
  // console.log(userPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        if (currentUser.isAdmin) {
          const res = await fetch(`/api/post/getposts`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } else {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (currentUser) {
      fetchPosts();
    }

  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        )
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <div className="mb-[10px] px-[20px] max-h-[800px] overscroll-y-auto w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 bg-gray-100 dark:bg-[#11181f]">
      {currentUser && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-gray-300">Date updated</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Post ID</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Post image</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Post title</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Category</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Delete</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {
              userPosts.map((post) => (
                <Table.Body className="divide-y" key={post._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{post._id}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="w-20 h-20 object-cover bg-gray-500" />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="font-medium text-blue-400 dark:text-pink-400" to={`/post/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                      >Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="text-teal-500 hover:underline cursor-pointer" to={`/update-post/${post._id}`}>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            }
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full flex justify-center text-[16px] my-[20px] px-[5px] font-semibold text-white hover:no-underline max-w-[200px] rounded-[10px] mx-auto bg-indigo-400  text-center p-[5px]  dark:hover:text-indigo-600 hover:font-bold hover:scale-x-105 tranform transition-transform'>Show more</button>
            )
          }
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-40 w-40 mb-4 mx-auto' style={{ color: 'lightcoral' }} />
            <h3 className='mb-5 text-lg text-gray-500 derk:text-gray-400'>Are you sure want to delete this post ?</h3>
            <div className="flex justify-between">
              <Button className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded' onClick={() => setShowModal(false)}>Cancel</Button>
              <Button color='failure' onClick={handleDeletePost}>Yes, I'm sure</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>

  )
}
