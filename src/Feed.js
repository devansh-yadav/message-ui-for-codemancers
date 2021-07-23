import React, { useState } from 'react'
import './Feed.css'
import MessageBox from './MessageBox.js';
import Post from './Post.js';

function Feed() {
    const [post, setPost] = useState([])

    return (
        <div className="feed">
            <MessageBox setPost={setPost} />
            {post.map(item => {
                return (
                    <div key={item.url} className="post">
                        <Post message={item.msg} gif={item.url} />
                    </div>
                )
            })}
        </div>
    )
}

export default Feed