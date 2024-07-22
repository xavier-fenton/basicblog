import { useMemo, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchPosts } from '../netclient'
import { BlogPost } from '../types';


export default function Blog() {
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
    <div>
      {blogData ? blogData.map((blogPost, index) => {        
        return (
          <div key={index}>
              <Accordion key={blogPost.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {blogPost.title}
                </AccordionSummary>
                <AccordionDetails>
                  {blogPost.body}
                </AccordionDetails>
              </Accordion>

          </div>
        )
      }) : <div>No Blog Posts</div>}



    </div>
  );

}