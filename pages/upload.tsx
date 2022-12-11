import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import { TUser } from '../global';

const Upload = () => {
  const router = useRouter();
  const {userProfile}: any = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null >(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [saving, setSaving] = useState(false);
  const uploadVideo = async (e: any) => {
    const file = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (file && fileTypes.includes(file.type)) {
      client.assets.upload('file', file, {
        contentType: file.type,
        filename: file.name,
      }).then((asset) => {
        setVideoAsset(asset);
        setIsLoading(false);
      });
    } else {
      alert('Please upload a valid video file');
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (videoAsset?._id && caption && category) {
      setSaving(true);
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post('http://localhost:3000/api/post', document);
      setSaving(false);
      router.push('/');
    } else { 
      alert('Please fill all the fields');
    }
  };
  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>  
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'>

                    </video>
                  </div>
                ) : (
                  <label className='cursor-pointer '>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-6xl text-gray-400' />
                        </p>
                        <p className='text-xl font-semibold text-center'>Select Video to Upload</p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        MP4 or WenM or ogg <br />
                        720p or 1080p <br />
                        Up to 10 minutes <br />
                        Less than 1GB
                      </p>
                      <p className='bg-[#1eaa9f] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>Select File</p>
                    </div>
                    <input type="file" name='upload-video' className='w-0 h-0' onChange={uploadVideo} />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label htmlFor="" className='text-md font-medium'>Caption</label>
          <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className='rounded outline-none text-md border-2 border-gray-200 p-2' />
          <label htmlFor="">Choose a category</label>
          <select name="" id="" onChange={e => setCategory(e.target.value)} className='outline-none lg:w-[150px] border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'>{topics.map(topic => (
            <option key={topic.name} value={topic.name} className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'>{topic.name}</option>
          ))}</select>
          <div className='flex gap-6 mt-10'>
            <button className='bg-[#1eaa9f] text-white text-md font-medium p-2 w-28 lg:w-44 outline-none rounded' onClick={handlePost} type='button'>Post</button>
            <button className='bg-[#FF0000] text-white text-md font-medium p-2 w-28 lg:w-44 outline-none rounded' onClick={() => {}} type='button'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;