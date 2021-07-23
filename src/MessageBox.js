import React, { useState, useEffect } from 'react';
import './MessageBox.css';

function MessageBox({ setPost }) {

    const [message, setMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [state, setState] = useState({
        results: [],
        loading: false
    })
    const [url, setUrl] = useState('')

    const handleSubmit = () => {
        setPost(prev => {
            return [...prev, {
                url: url,
                msg: message
            }]
        })

        setMessage('')
        setSearchTerm('')
        setUrl('')
    }

    const handleGifSearch = e => {
        setSearchTerm(e.target.value)
        setState({
            results: [],
            loading: true,
        })
    }

    const idHandler = event => {
        setUrl(event.target.src)
        setState({
            results: [],
            loading: false
        })
    }

    const renderSearchResults = () => {

        const results = state.results
        // return results.length ? (results.map((result, index) => {
        //     const url = `https://media.giphy.com/media/${result.id}/giphy.gif`
        //     return (
        //         <img src={url} alt="GIF" key={result.id} onClick={idHandler} />
        //     )
        // })
        // ) :
        //     null

        console.log(results)

        return(results && results.map((result, index) => {
            const url = `https://media.giphy.com/media/${result.id}/giphy.gif`
            return (
                <img src={url} alt="GIF" key={result.id} onClick={idHandler} />
            )
        })
        )
    }

    useEffect(() => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=BLroI0ezuXaE5e6XjBH6yLpRKZxOaVzv&q=${searchTerm}&limit=4`)
            .then(response => {
                response.json()
                    .then(data => {
                        setState({
                            results: data.data,
                            loading: true
                        }
                        )
                    })
            })
            .catch(err => {
                console.log(err)
            });

    }, [searchTerm])

    return (
        <div className="message-box-container">
            <div className="message-box-top">
                <form>
                    <input
                        type="text"
                        placeholder="Write something here..." className="message-box-input"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Search GIF"
                        className="search-gif"
                        value={searchTerm}
                        onChange={handleGifSearch}
                    />
                </form>
                {url ? <img src={url} alt="GIF" className="post-image" /> : null}
                <div className="fetch-results">
                    {renderSearchResults()}
                </div>

            </div>

            <div className="message-box-bottom">
                <button type="submit" className="btn btn-post" onClick={handleSubmit}>Post</button>
            </div>
        </div>
    )
}

export default MessageBox
