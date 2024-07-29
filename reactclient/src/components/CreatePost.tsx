import React, { useState } from 'react';
import CreateForm from './subcomponents/CreateForm'

const CreatePost = () => {
    const [create, setCreate] = useState<boolean>(false)
    return (
        <div className='w-[500px]'>
            {create ? <CreateForm /> : <button className='text-xs px-[20px] py-[10px] bg-gray-200' onClick={() => setCreate(true)}>Create a Blog</button>}
        </div>
    );
};

export default CreatePost;