import React from 'react'
import './loading.css'

const Loading = () => {
    return (
        <div className='container' >
            <div className="square">
                <span style={{ '--i': 0 }} ></span>
                <span style={{ '--i': 1 }} ></span>
                <span style={{ '--i': 2 }} ></span>
                <span style={{ '--i': 3 }} ></span>
            </div>
            <div className="square">
                <span style={{ '--i': 0 }} ></span>
                <span style={{ '--i': 1 }} ></span>
                <span style={{ '--i': 2 }} ></span>
                <span style={{ '--i': 3 }} ></span>
            </div>
            <div className="square">
                <span style={{ '--i': 0 }} ></span>
                <span style={{ '--i': 1 }} ></span>
                <span style={{ '--i': 2 }} ></span>
                <span style={{ '--i': 3 }} ></span>
            </div>
        </div>
    )
}

export default Loading