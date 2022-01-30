import Post from "../models/post"



const createPost = async (req, res, next) => {
    
    try {
        const post = await Post.create(req.body)

        res.status(201).json({
            success: true,
            post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
    
}

const allPosts = async (req, res, next) => {
    
    try {
        const posts = await Post.find().sort({ createdAt: -1})

        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
    
}

const deletePost = async (req, res, next) => {
    
    const post = await Post.findById(req.query.postId)

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    await post.remove()

    res.status(200).json({
        success: true,
        message: "Post deleted"
    })
    
}

export {
    createPost,
    allPosts,
    deletePost
}