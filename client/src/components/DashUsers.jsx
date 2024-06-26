import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Modal, Table, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {FaCheck,FaTimes} from 'react-icons/fa'
export default function DashUsers() {

  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('')
  // console.log(userPosts)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    if (currentUser.isAdmin) {
      fetchUsers();
    }

  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if(res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
            setShowModal(false);
        }else{
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  }



  return (
    <div className="px-[20px] w-full max-h-[800px] overscroll-y-auto table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 bg-gray-100 dark:bg-[#11181f]">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-gray-300">Date created</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">User ID</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">User image</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Username</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Email</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Admin</Table.HeadCell>
              <Table.HeadCell className="bg-gray-300">Delete</Table.HeadCell>
              
            </Table.Head>
            {
              users.map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      {user._id}
                    </Table.Cell>
                    <Table.Cell>      
                        <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full bg-gray-500" />
                    </Table.Cell>
                    <Table.Cell>
                      {user.username}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                        {user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}
                    </Table.Cell>

                    <Table.Cell>
                      <span 
                        className="font-medium text-red-500 hover:underline cursor-pointer" 
                        onClick={()=> {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                      >Delete</span>
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
        <p>You have no users yet!</p>
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
            <h3 className='mb-5 text-lg text-gray-500 derk:text-gray-400'>Are you sure want to delete this user ?</h3>
            <div className="flex justify-between">
              <Button className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded' onClick={() => setShowModal(false)}>Cancel</Button>
              <Button color='failure' onClick={handleDeleteUser} >Yes, I'm sure</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>

  )
}
