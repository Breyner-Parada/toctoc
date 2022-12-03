import React from 'react';
import axios from 'axios';
import { IVideo } from '../global';
import { VideoCard, NoResults} from '../components';

export const getServerSideProps = async () => {
  const {data} = await axios.get(`http://localhost:3000/api/post`);
  return {
    props: {
      videos: data
    },
  };
};

type Props = {
  videos: IVideo[];
};

const Home = ({ videos }: Props) => {
  
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? 
        videos.map((video: IVideo) => (
          <VideoCard  post={video} key={video._id}/>
        ))
        : (
          <NoResults text='No videos found' />
        )
      }

    </div>
  );
};

export default Home;
