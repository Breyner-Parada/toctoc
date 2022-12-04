import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io';
import Logo from '../utils/toctoc-logo.png';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  // const [user, setUser] = useState(null);
  const {userProfile, addUser, removeUser} = useAuthStore();

  // useEffect(() => {
  //   setUser(userProfile);
  // }, [userProfile]);

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
      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10 items-center'>
            <Link href="/upload">
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-2xl md:text-3xl' />{' '}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href='/'>
                <>
                  <Image width={40} height={40} className='rounded-full' src={userProfile.image} alt='Profile Photo' />
                </>
              </Link>
            )}
            <button type='button' className='px-3' onClick={() => {googleLogout(); removeUser();}}>
              <AiOutlineLogout className='text-2xl md:text-3xl' color='red' fontSize={21}/>
            </button>
          </div>
        ) : (
          <GoogleLogin onSuccess={(response) => createOrGetUser(response, addUser)} onError={() => console.log('Error')} />
        )}
      </div>
    </div>
  );
};

export default Navbar;