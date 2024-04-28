import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      dispatch(signInFailure('Please fill all the fields!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="min-h-screen mt-20 " >
      <div className="flex p-[20px] max-w-[900px] lg:min-h-[400px] mx-auto  flex-col md:flex-row md:items-center gap-5 border rounded-[10px] shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-indigo-500/90 bg-summer dark:bg-sky bg-cover ">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-400 via-slate-400-500 to-pink-500 rounded-lg text-white'>Kaydi's</span>Blog
          </Link>
          <p className="text-sm mt-5">Welcome to my Blog. You can sign in with your email and password or with Google</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder="name@gmail.com" id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder="Password" id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign In
              {/* {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign In'} */}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have any account ? </span>
            <Link to='/sign-up' className="text-blue-600">Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-3" color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
