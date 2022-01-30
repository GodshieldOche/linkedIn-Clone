import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Input from "./Input"
import Post from "./Post"



const Feeds = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)


    return (
        <div className="space-y-6 pb-24 max-w-lg">
            <Input />
            {posts && posts.map((post, index) => (
                <Post key={post._id} post={post} index={index} />
            ))}
        </div>
    )
}

export default Feeds
