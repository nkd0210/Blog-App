import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitter, BsDiscord} from 'react-icons/bs'

export default function FooterCom() {
    return (
        <Footer container className='border border-gray-900 bg-woodDark bg-cover'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1 ">
                    <div className="mt-5">
                        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-400 via-slate-400-500 to-pink-500 rounded-lg text-white'>Kaydi's</span>
                            <span className='text-cyan-200 dark:text-indigo-400'> Stories</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6 ">
                        <div>
                            <Footer.Title title='about' className='text-white' />
                            <Footer.LinkGroup col>
                            <Footer.Link href="https://comfy-cloth.onrender.com/" target='_blank' rel='noopener noreferrer'>
                                <span className='border-none hover:border-none cursor-pointer text-white hover:text-gray-400'>
                                    Cozy and comfy
                                </span>
                            </Footer.Link>
                            <Footer.Link href="/about" target='_blank' rel='noopener noreferrer'>
                                <span className='border-none hover:border-none cursor-pointer text-white hover:text-gray-400'>
                                    Kaydi's Stories
                                </span>
                            </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow us' className='text-white' />
                            <Footer.LinkGroup col>
                            <Footer.Link href="https://github.com/nkd0210" target='_blank' rel='noopener noreferrer'>
                                <span className='border-none hover:border-none cursor-pointer text-white hover:text-gray-400'>Github</span>
                            </Footer.Link>
                            <Footer.Link href="#">
                                <span className='border-none hover:border-none cursor-pointer text-white hover:text-gray-400'>Facebook</span>
                            </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' className='text-white'/>
                            <Footer.LinkGroup col>
                            <Footer.Link href="#">
                                <span className='border-none hover:border-none cursor-pointer text-white hover:text-gray-400'>
                                    Privacy Policy
                                </span>
                            </Footer.Link>
                            <Footer.Link href="#">
                                <span className='border-none hover:border-none cursor-pointer text-white hover:text-gray-400'>
                                    Terms & Conditions
                                </span>
                            </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>

                <Footer.Divider />

                <div className="w-full sm:flex sm:item-center sm:justify-between">
                    <Footer.Copyright href="#" by="Kaydi's Blog" year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsTwitter}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsDiscord}></Footer.Icon>
                    </div>
                </div>
            </div>
        </Footer>
    )
}
