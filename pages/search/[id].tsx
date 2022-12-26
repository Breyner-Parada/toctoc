import React, {useState} from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';
import { VideoCard, NoResults } from '../../components';
import { IUser, IVideo  } from '../../global';
import { BASE_URL } from '../../utils';

type TParams = {
    params: {
      id: string;
    }
  };

type TProps = {
    videos: IVideo[];
    };
export const getServerSideProps = async ({params: {id}}: TParams) => {
  const {data} = await axios.get(`${BASE_URL}/api/search/${id}`);
  
  return {
    props: {
      videos: data
    }
  };
};

const Search = ({videos}: TProps ) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const {allUsers} = useAuthStore();
  const {id}: any = router.query;
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-200';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-200';
  const filteredUsers = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(id.toLowerCase()));
  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-5 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
        <p className={`text-xl font font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>
      </div>
      {isAccounts ? (
        <div className=''>
          {filteredUsers.length ? (
            filteredUsers.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className='flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
                  <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                    <div>
                      <Image src={user.image} width={50} height={50} className='rounded-full' alt="User profile"/>
                    </div>
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className="text-md inline-block text-blue-500"/>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (<NoResults text={`No accounts results for ${id}`} />)}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length  ? (
            videos.map((video: IVideo) => (
              <VideoCard key={video._id} post={video} />
            ))
          ) : (<NoResults text={`No video results for ${id}`} />)}
        </div>
      )}
    </div>
  );
};

export default Search;