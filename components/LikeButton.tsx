import React, {useState, useEffect} from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

interface IProps {
    handleDislike: () => void;
    handleLike: () => void;
    Likes: any[];
}

function LikeButton({handleDislike, handleLike, Likes}: IProps) {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const {userProfile}: any = useAuthStore();
  const filteredLikes = Likes?.filter((like) => like._ref === userProfile?._id);
  useEffect(() => {
    if (filteredLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [Likes, filteredLikes]);
  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#00CCBB]' onClick={handleDislike}>
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ): (
          <div className='bg-primary rounded-full p-2 md:p-4' onClick={handleLike}>
            <MdFavorite className='text-lg md:text-2xl' />
          </div>)}
        <p className='text-md font-semibold'>{Likes?.length || 0}</p>
      </div>
    </div>
  );
}

export default LikeButton;