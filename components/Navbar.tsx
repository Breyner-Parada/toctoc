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

type TEvent = {
  preventDefault: () => void;
}

const Navbar = () => {
  const {userProfile, addUser, removeUser}: any = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const handleSearch = (e: TEvent) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

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
      <div className='relative hidden md:block'>
        <form onSubmit={handleSearch} className='absolute md:static top-10 left-10 bg-white'>
          <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder='Search accounts or videos' className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0' />
          <button onClick={handleSearch} className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'><BiSearch /></button>
        </form>
      </div>
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