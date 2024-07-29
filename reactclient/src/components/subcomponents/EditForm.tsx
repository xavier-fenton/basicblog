import React, { FormEvent } from "react";
import { BlogPost } from "../../types";
import { updatePost } from "../../netclient";

export default function EditForm(blogPost: BlogPost): React.JSX.Element {

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
      try {

        const form = e.target
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        const sendData = {...blogPost, title: formJson.title, body: formJson.body};
        
        updatePost(sendData as unknown as BodyInit)
      } catch (error) {
        console.log(error);
      } 

    }
 
  
      return (
        <>
          <form
            onSubmit={handleSubmit}
            className={`pb-[10px] border flex flex-col gap-[10px] px-[20px] py-[10px] w-[500px] `}
          >
            <div><img src='/images/example.jpg' /></div>
            <input name='title' className='border p-[5px] text-[12px]' type='text' defaultValue={blogPost?.title} />
            <textarea name='body' className='border p-[5px] h-[80px] text-[10px]' defaultValue={blogPost?.body} />
            <div className='flex flex-col gap-[5px] text-[8px]'>
              <input type='submit'></input>
            </div>
          </form>
        </>
      )
}
