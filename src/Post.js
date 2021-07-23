import React from 'react';
import './Post.css';

function Post({message, gif}) {

    return (
        <>
            <div className="post-message">
                <p>{message}</p>
            </div>

            {gif === "" ? null : <div className="post-gif">
                <img src={gif} alt="GIF" />
            </div>}
            
            <div className="post-options">
                <div className="post-option"><p>Like</p></div>  
                <div className="post-option"><p>Comment</p></div>
                <div className="post-option"><p>Share</p></div>
            </div>
        </>
    )
}

export default Post
