import { useMemo, useState } from 'react';
import { fetchPosts } from '../netclient'
import { BlogPost } from '../types';


export default function BlogPosts() {
  const [blogData, setBlogData] = useState<Array<BlogPost> | null>(
    null,
  )

  useMemo(async () => {
    const data = await fetchPosts()
    if (data !== null) {
      setBlogData(data)
    }
  }, [])
  

  return (
    <div className='flex flex-col gap-[5px] justify-center items-center'>
      {blogData ? blogData.map((blogPost, index) => {
        return (
          <div className='border flex flex-col gap-[5px] px-[20px] py-[10px] w-[500px]' key={index}>
            <div><img src='/images/example.jpg'/></div>
            <div className='text-[12px]'>{blogPost.title}</div>
            <div className='text-[10px]'>{blogPost.body}</div>
            {
              blogPost.date_created ? <div className='text-[8px]'>{blogPost.date_created}</div> : null
            }
            

            
          </div>
        )
      }) : <div>No Blog Posts</div>}



    </div>
  );

}