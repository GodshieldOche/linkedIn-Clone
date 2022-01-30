import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { createPost, allPosts } from '../../../controllers/postController';


const handler = nc();

dbConnect()
handler.post(createPost)

handler.get(allPosts)


export default handler