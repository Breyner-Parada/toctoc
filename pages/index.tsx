import React from 'react';
import axios from 'axios';
import { IVideo } from '../global';
import { VideoCard, NoResults} from '../components';
import { BASE_URL } from '../utils';

type TQuery = {
  query: {
    topic: string;
  }
};

export const getServerSideProps = async ({query: {topic}}: TQuery) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    
  } else {

    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: response.data,
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
