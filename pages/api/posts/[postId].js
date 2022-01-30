import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { deletePost } from '../../../controllers/postController';


const handler = nc();

dbConnect()
handler.delete(deletePost)




export default handler