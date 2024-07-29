import React, { FormEvent } from 'react';
import { createPost } from '../../netclient';

const CreateForm = () => {

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        try {
          const form = e.target
          const formData = new FormData(form as HTMLFormElement);
          const formJson = Object.fromEntries(formData.entries());
          const sendData = {title: formJson.title, body: formJson.body}
          
          createPost(sendData as unknown as BodyInit)
        } catch (error) {
          console.log(error);
        } 
  
      }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className={`pb-[10px] border flex flex-col gap-[10px] px-[20px] py-[10px] w-[500px] `}
            >
                <div><img src='/images/example.jpg' /></div>
                <input name='title' className='border p-[5px] text-[12px]' type='text' />
                <textarea name='body' className='border p-[5px] h-[80px] text-[10px]' />
                <div className='flex flex-col gap-[5px] text-[8px]'>
                    <input type='submit'></input>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;