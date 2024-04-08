export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-blue-200 dark:from-orange-100 dark:to-purple-300'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7 text-blue-500 dark:text-purple-500'>
            About Kaydi' Blog
          </h1>
          <div className='text-md text-gray-600 flex flex-col gap-6'>
            <p>
              Welcome to Kaydi's Blog! This blog was created by Nguyễn Kim Dũng
              as a project to share my thoughts and ideas with the
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