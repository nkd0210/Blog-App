import React, { useState } from 'react'
import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from 'firebase/storage';
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';


export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [changeCategory, setChangeCategory] = useState(false);

  const navigate = useNavigate();
  // console.log(formData);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("please select an image")
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file); // bdau qua trinh tai len
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          })
        }
      )
    } catch (error) {
      setImageUploadError('Image upload failed')
      setImageUploadProgress(null);
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something went wrong')
    }
  }

  const handleChangeCategory = () => {
    setChangeCategory(true);
  }



  return (
    <div className='max-w-3xl mx-auto min-h-screen border my-[20px] shadow-lg border-gray-200 shadow-gray-500/90 dark:border-indigo-400 dark:shadow-indigo-500/90 rounded-t-[50px] p-[20px] '>
      <h1 className='text-center uppercase text-3xl my-7 font-semibold text-red-400 dark:text-indigo-400 '>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type='text'
            placeholder='Title'
            required id='title'
            className='flex-1'
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value })
            }}
          />
          {!changeCategory && (
            <Select
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value })
              }}
            >
              <option value='uncategorized'>Select a category</option>
              <option value='javascript'>Javascript</option>
              <option value='reactjs'>Reactjs</option>
              <option value='html css'>HTML CSS</option>
              <option value='java'>Java</option>
              <option value='nextjs'>Nextjs</option>
              <option value='basketball'>Basketball</option>
              <option value='new' onClick={handleChangeCategory}>Choose a new category</option>
            </Select>
          )}

          {
            changeCategory && (
              <TextInput
                type='text'
                placeholder='new category'
                required id='category'
                className='flex-1'
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value })
                }}
              />
            )
          }
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' onClick={handleUploadImage} disabled={imageUploadProgress}>
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something ... '
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value })
          }}
        />
        <Button type='submit' gradientDuoTone='pinkToOrange'>Publish</Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  )
}
