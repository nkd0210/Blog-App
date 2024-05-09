export default function About() {
  return (
    <div className='min-h-screen lg:min-h-[700px] flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div className="border p-[20px] rounded-[20px] border-gray-400 dark:border-indigo-400 shadow-lg shadow-gray-500/90 dark:shadow-indigo-500/90  bg-opacity-50 backdrop-blur-md">
          <h1 className='text-3xl font font-semibold text-center text-black dark:text-purple-400'>
            About Kaydi's Blog
          </h1>
          <div className='text-lg text-gray-900 dark:text-white flex flex-col gap-6 pt-[20px]'>
            <p>
              Welcome to Kaydi's Blog! This blog was created to share my thoughts and ideas with the
              world. I am a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages.
            </p>

            <p>
              I encourage you to leave comments on my posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. I believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}