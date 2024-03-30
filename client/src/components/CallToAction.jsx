import { Button } from 'flowbite-react';
import { FaGithub } from 'react-icons/fa';

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className=" justify-center flex flex-col">
                <h2 className='text-2xl text-pink-400 dark:text-green-400'>
                    You can check through my ecommerce website
                </h2>
                <p className='text-gray-500 my-2'>
                    Live site
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://comfy-cloth.onrender.com/" target='_blank' rel='noopener noreferrer'>
                        Cozy and Comfy
                    </a>
                </Button>
                <p className='text-gray-500 my-2 '>
                    My github repository
                </p>
                <Button className='rounded-tl-xl rounded-bl-none bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
                    <a href="https://github.com/nkd0210/comfySloth" target='_blank' rel='noopener noreferrer'>
                        <FaGithub className='text-lg' />
                    </a>
                </Button>
            </div>
            <div className="p-7 ">
                <img src="https://cdn.vietnambiz.vn/2019/8/2/impact-of-ecommerce-on-society-15647219830501355870318-crop-1564722020371805734630.png" />
            </div>
        </div>
    )
}
