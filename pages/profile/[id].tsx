import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { VideoCard, NoResults } from '../../components';
import { IUser, IVideo  } from '../../global';
import { BASE_URL } from '../../utils';
import { NextPage } from 'next';

type TParams = {
  params: {
    id: string;
  }
};

interface IProps {
  data: {
    user: IUser
    userVideos: IVideo[]
    userLikedVideos: IVideo[]
  }
}

export const getServerSideProps = async ({params: {id}}: TParams) => {
  const {data} = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data
    }
  };
};



const Profile: NextPage<IProps> = ({data}) => {
  const {user, userVideos, userLikedVideos} = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<IVideo[]>([]);

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-200';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-200';

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);
  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb4 bg-white w-full'>
        <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
          <div className="w-16 h-16 lg:h-32 lg:w-32">
            <Image src={user.image} width={120} height={120} className='rounded-full' alt="User profile"/>
          </div>
          <div className="flex-col">
            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase md:text-2xl tracking-wider">
              {user.userName.replaceAll(' ', '')}
              <GoVerified className="text-md inline-block text-blue-500"/>
            </p>
            <p className="md:text-xl capitalize text-gray-400 text-xs">{user.userName}</p>
          </div>
        </div>
      </div>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}>Videos</p>
        <p className={`text-xl font font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}>Liked</p>
      </div>
      <div className='flex gap-6 flex-wrap md:justify-start'>
        {videosList.length > 0 ? videosList.map((post: IVideo, index: number) => (
          <VideoCard key={index} post={post} />
        )) : (
          <NoResults text={`No ${showUserVideos ? '' : 'Liked' } videos yet`} />
        )}
      </div>
    </div>
  );
};

export default Profile;