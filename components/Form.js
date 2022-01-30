import { useState } from "react"
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/features/post";
import { setModalState } from "../redux/features/modal";
import { getPosts } from "../redux/features/posts";


const Form = () => {
    const [ input, setInput ] = useState('')
    const [ photoUrl, setPhotoUrl ] = useState('')
    const { data: session } = useSession();

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.post)

    const uploadPost = (e) => {
        e.preventDefault()
        const postData = {
            input: input,
            photoUrl: photoUrl,
            username: session.user.name,
            email: session.user.email,
            userImg: session.user.image,
            createdAt: new Date().toString(),
        }

        dispatch(createPost(postData)).then(result => {
            if (!result.error) {
                dispatch(getPosts())
                dispatch(setModalState(false))
            } else {
                console.log(result)
            }
            
        })
    }

    return (
        <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
            <textarea
                rows="4"
                placeholder="What do you want to talk about?"
                className="bg-transparent focus:outline-none dark:placeholder-white/75"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <input
                type="text"
                placeholder="Add a photo URL (optional)"
                className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
            />

            <button
                className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
                type="submit"
                onClick={uploadPost}
                disabled={!input.trim() && !photoUrl.trim()}
            >
                {loading ? "L..." : "Post" }
            </button>
        </form>
    )
}

export default Form
