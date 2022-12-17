import {useState, useRef} from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';
import { useRouter } from 'next/router';
import { IVideo } from '../global';

 


interface IProps {
    post: IVideo;
};

// const VideoCard = <T extends IProps>({post}: T) => {
//   console.log(post._id);
//   return (
//     <div>VideoCard</div>
//   );
// };

const VideoCard: NextPage<IProps> = ({post}: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play();
        setPlaying(true);
      }
    }
  };
  const onVideoMuted = () => {
    if (videoRef.current) {
      if (isVideoMuted) {
        videoRef.current.muted = false;
        setIsVideoMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsVideoMuted(true);
      }
    }
  };
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              <>
                <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='Profile Photo' />
              </>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName}{" "}<GoVerified className='text-md inline-block text-blue-500' /></p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>                
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='rounded-3xl'>
          <Link href={`/detail/${post._id}`}>
            <video src={post.video.asset.url} loop className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer' ref={videoRef}></video>
          </Link>
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-2xl lg:text-4xl text-black' />
                </button>
              ):
                (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className='text-2xl lg:text-4xl text-black' />
                  </button>
                )}
              {isVideoMuted ? (
                <button onClick={onVideoMuted}>
                  <HiVolumeOff className='text-2xl lg:text-4xl text-black' />
                </button>
              ):
                (
                  <button onClick={onVideoMuted}>
                    <HiVolumeUp className='text-2xl lg:text-4xl text-black' />
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
