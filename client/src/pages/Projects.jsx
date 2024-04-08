import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen w-full mx-auto flex justify-center items-center flex-col gap-6 p-3 bg-gradient-to-r from-pink-200 to-blue-200 dark:from-orange-100 dark:to-purple-300'>
      <h1 className='text-3xl font-semibold text-orange-400 dark:text-purple-500'>Projects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects with Reactjs!</p>
      <CallToAction />
    </div>
  )
}