import React, { useState } from 'react'
import './Feed.css'
import MessageBox from './MessageBox.js';
import Post from './Post.js';

function Feed() {
    const [postState, setPostState] = useState([])

    return (
        <div className="feed">
            <MessageBox setPost={setPostState} />
            {postState.map(item => {
                return (
                    <div key={item.url} className="post">
                        <Post message={item.msg} gifUrl={item.url} />
                    </div>
                )
            })}
        </div>
    )
}

export default Feed