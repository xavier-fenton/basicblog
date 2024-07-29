import './index.css'
import BlogPosts from './components/BlogPosts';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className='flex flex-col px-[20px] py-[10px] gap-[10px] items-center justify center'>
      <div className='text-sm'>nn5 blog</div>
      <div className='h-full w-full'>
        <BlogPosts />
      </div>
        <CreatePost/>
    </div>
  );
}

export default App;
