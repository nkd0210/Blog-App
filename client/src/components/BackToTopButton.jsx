import React from 'react'
import { useState, useEffect } from 'react'
import { FaArrowAltCircleUp } from "react-icons/fa";

const BackToTopButton = () => {
    const [backToTopBtn, setBackToTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 200) {
                setBackToTopBtn(true);
            }else {
                setBackToTopBtn(false);
            }
        })
    },[])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

  return (
    <div>
        {backToTopBtn && (
            <button className='upBtn fixed bottom-[50px] right-[10px]' onClick={scrollUp}>
                <FaArrowAltCircleUp className='text-[30px] text-cyan-300 dark:text-indigo-400 animate-bounce transform hover:scale-105 transition duration-100' />
            </button>
        )}
    </div>
   
  )
}


export default BackToTopButton