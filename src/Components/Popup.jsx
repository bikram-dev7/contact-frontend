import React from 'react'
import { useState, useEffect } from 'react'

const Popup = ({ show, title, initialData, onClose, onSave }) => {
    const [formData, setFormData] = useState(initialData || {})

    // Keep form in sync whenever a new initialData is passed in
    useEffect(() => {
        setFormData(initialData || {})
    }, [initialData])
    if (!show) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        onSave(formData) 
    }

    return (
        <>
            <div className="modal fade show " style={{ display: 'block' }} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h5 className="text-start mb-5">{title}</h5>
                            <div className='d-flex gap-4 mt-3'>
                                <button
                                    className="btn btn-secondary btn-sm flex-fill"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-danger btn-sm flex-fill"
                                    onClick={handleSave}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>


                        {/* <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default Popup