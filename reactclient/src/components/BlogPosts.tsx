import { EventHandler, FormEvent, FormEventHandler, MutableRefObject, useMemo, useRef, useState } from 'react';
import { fetchPosts, updatePost } from '../netclient'
import { BlogPost } from '../types';
import EditForm from './subcomponents/EditForm';


type SubmitProps = {
  data: BlogPost | Iterable<BlogPost>,
  e: Event
}

export default function BlogPosts() {
  const [blogData, setBlogData] = useState<Array<BlogPost>>()
  const [updateForm, setUpdateForm] = useState(false)
  const [edit, setEdit] = useState(false)


  useMemo(async () => {
    const data = await fetchPosts()
    if (data !== null) {
      setBlogData(data)
    }
  }, [])

  

  return (
    <div className={`flex flex-col gap-[5px] justify-center items-center `}>
      
      {blogData ? blogData.map((blogPost: BlogPost) => {
        return (
          <>
            {!updateForm ? <div className='pb-[10px] border flex flex-col gap-[10px] px-[20px] py-[10px] w-[500px]' key={blogPost.id} onMouseEnter={() => setEdit(true)} onMouseLeave={() => setEdit(false)}>
              <div><img src='/images/example.jpg' /></div>
              <div className='text-[12px]'>{blogPost.title}</div>
              <div className='text-[10px]'>{blogPost.body}</div>
              {
                blogPost.date_created ? <div className='text-[8px]'>{blogPost.date_created}</div> : null
              }
              <div
                className={`w-fit text-[10px] px-[10px] cursor-pointer h-[15px] mt-[10px] ${edit === true ? 'bg-gray-200' : 'bg-inherit'}`}
                onClick={() => {
                  setUpdateForm(true)
                  return;
                }
                }>
                {blogPost.id && edit === true ? 'Edit' : null}
              </div>

            </div> : <EditForm {...blogPost} />
            }
          </>
        )
      }) : <div>No Blog Posts</div>}



    </div>
  );

}