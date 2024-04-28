import { Button } from 'flowbite-react';
import { FaGithub } from 'react-icons/fa';
import { assets } from '../assets/img/assets';

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-cyan-500 shadow-cyan-500/50  dark:border-indigo-500 shadow-lg dark:shadow-indigo-500/90 justify-center items-center rounded-[20px] text-center'>
            <div className=" justify-center flex flex-col  border-cyan-400 dark:border-indigo-400 p-[20px] rounded-[20px] border  ">
                <h2 className='text-2xl text-orange-400 dark:text-purple-400 hidden lg:block '  >
                    You can check through our ecommerce website
                </h2>
                <p className=' text-gray-500 dark:text-white my-2'>
                    Live site
                </p>
                <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none'>
                    <a href="http://localhost:5174/" target='_blank' rel='noopener noreferrer'>
                        Kaydi FoodStore
                    </a>
                </Button>
                <p className='text-gray-500 dark:text-white p-[10px] '>
                    My github repository
                </p>
                <Button className='rounded-tl-xl rounded-bl-none ' gradientDuoTone='purpleToPink'>
                    <a href="https://github.com/nkd0210/comfySloth" target='_blank' rel='noopener noreferrer'>
                        <FaGithub className='text-lg' />
                    </a>
                </Button>
            </div>
            <div className="max-w-[800px] p-[10px] ml-[20px] ">
                <img src={assets.kaydifoodstore} className='w-full rounded-[20px]' />
            </div>
        </div>
    )
}
