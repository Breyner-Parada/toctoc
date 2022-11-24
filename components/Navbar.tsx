import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io';
import Logo from '../utils/toctoc-logo.png';

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2'>
        <Link href='/'>
            <div className='w-[100px] md:w-[130px]'>
                <Image 
                className='cursor-pointer'
                src={Logo}
                alt='toc-toc-logo'
                />
            </div>
        </Link>
    </div>
  )
}

export default Navbar