import React from 'react'

const Loader = ({show}) => {
    if (!show) return null;
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999,
            }}
        >
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
