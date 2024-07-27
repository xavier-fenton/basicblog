import React from 'react';
import './index.css'
import BlogPosts from './components/BlogPosts';
function App() {
  return (
    <div className='flex flex-col px-[20px] py-[10px] gap-[10px] items-center justify center'>
          <div className='text-sm'>nn5 blog</div>
          <div className='h-full w-full px-[20px] py-[20px]'><BlogPosts /></div>
    </div>
  );
}

export default App;
