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
        
        url || message ?
        setPost(prev => {
            return [{
                url: url,
                msg: message
            }, ...prev]
        })
        :
        alert("Enter something")

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

    const urlHandler = event => {
        setUrl(event.target.src)
        setState({
            results: [],
            loading: false
        })
    }

    const renderSearchResults = () => {
        const results = state.results
        return ( results && results.map(result => {
            const url = result.images.original.webp
            return (
                <img src={url} alt="GIF" key={result.id} onClick={urlHandler} />
            )
        })
        ) 
    }

    const loader = () => {
        return <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" className={`${state.loading ? 'show' : 'hide'}`} alt="loader" />
    }

    useEffect(() => {

        const axios = require('axios')
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=BLroI0ezuXaE5e6XjBH6yLpRKZxOaVzv&q=${searchTerm}&limit=5`, {
            cancelToken: source.token
        })
            .then(response => {
                setState({
                    results: response.data.data,
                    loading: false
                })

            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    // Handle if request was cancelled
                    console.log('Request canceled', error.message);
                    return null
                } else {
                    // Handle usual errors
                    console.log('Something went wrong: ', error.message)
                }
            })

        return function cleanup () {
            if(source) {
                source.cancel()
            }
        }

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
                    {loader()}
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
