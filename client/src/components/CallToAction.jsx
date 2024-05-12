import { Button } from 'flowbite-react';
import { FaGithub } from 'react-icons/fa';
import { assets } from '../assets/img/assets';

export default function CallToAction() {
    return (
        <div className='flex flex-col-reverse md:flex-row p-3 bg-gray-100 dark:bg-[#11181f]  border border-gray-300 shadow-gray-500/50  dark:border-indigo-500 shadow-lg dark:shadow-indigo-500/90 justify-center items-center rounded-[10px] text-center'>
            <div className="flex flex-row md:flex-col  border-gray-600 shadow-gray-500/50 dark:border-indigo-400 shadow-lg dark:shadow-indigo-500/90 p-[20px] rounded-[20px] border  ">

                <h2 className='text-[18px] text-gray-500 dark:text-white hidden lg:block '  >
                    You can check through our ecommerce website
                </h2>

                <p className='  text-[14px] lg:text-[16px] text-gray-500 dark:text-white my-2 hidden sm:block'>
                    Live site
                </p>

                <Button gradientDuoTone='purpleToBlue' className=' lg:rounded-tl-[30px] lg:rounded-br-[30px] mr-[30px] sm:mr-0 '>
                    <a href="http://localhost:5174/" target='_blank' rel='noopener noreferrer'>
                        <span className='text-[14px] lg:text-[16px]'>
                            Kaydi FoodStore
                        </span>
                    </a>
                </Button>

                <p className=' text-[14px] lg:text-[16px] text-gray-500 dark:text-white p-[10px] hidden sm:block '>
                    My github repository
                </p>

                <Button className='lg:rounded-tl-[30px] lg:rounded-br-[30px] ' gradientDuoTone='purpleToPink'>
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
