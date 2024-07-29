import { EventHandler, FormEvent, FormEventHandler, MutableRefObject, useMemo, useRef, useState } from 'react';
import { fetchPosts, updatePost } from '../netclient'
import { BlogPost } from '../types';
import EditForm from './subcomponents/EditForm';

// Todo: Bug: Fix edit functionality, only suppose to edit one blog post, but opens updateForm for all

type SubmitProps = {
  data: BlogPost | Iterable<BlogPost>,
  e: Event
}

export default function BlogPosts() {
  const [blogData, setBlogData] = useState<Array<BlogPost>>()
  const [updateForm, setUpdateForm] = useState(false) //This should be specific, maybe and array in the use state [id, boolean], when clicked sets id to current.id and sets true current post not all
  const [edit, setEdit] = useState(false)


  useMemo(async () => {
    const data = await fetchPosts()
    if (data !== null) {
      setBlogData(data)
    }
  }, [])

  

  return (
    <div className={`flex flex-col gap-[5px] justify-center items-center `}>
      
      {blogData ? blogData.map((blogPost: BlogPost, index: number) => {
        return (
          <div key={index}>
            {!updateForm ? <div className='pb-[10px] border flex flex-col gap-[10px] px-[20px] py-[10px] w-[500px]' key={blogPost.id}>
              <div><img src='/images/example.jpg' /></div>
              <div className='text-[12px]'>{blogPost.title}</div>
              <div className='text-[10px]'>{blogPost.body}</div>
              {
                blogPost.date_created ? <div className='text-[8px]'>{blogPost.date_created}</div> : null
              }
              <div
                className="w-fit text-[10px] px-[10px] cursor-pointer h-[15px] mt-[10px] bg-gray-200"
                onClick={() => {
                  setEdit(true)
                  setUpdateForm(true)
                  return;
                }
                }>
                Edit
              </div>

            </div> : <EditForm {...blogPost} />
            }
          </div>
        )
      }) : <div>No Blog Posts</div>}



    </div>
  );

}