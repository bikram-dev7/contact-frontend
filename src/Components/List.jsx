import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Popup from './Popup'
import { useLoader } from './LoaderContext'
import UpdateModal from './UpdateModal'
import { useNavigate } from 'react-router-dom'


function List() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [selectedID, setSelectedID] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const [showUpdatePopup, setShowUpdatePopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)
    const [selectedContact, setSelectedContact] = useState(null)
    const [loading, setLoading] = useState(false)
    const { showLoader, hideLoader } = useLoader();
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    // const [selectedContact, setSelectedContact] = useState({})

    const APIurl = 'https://6a6d8e27eb8865c4bf490643.mockapi.io/contact-info/api/employee-contact-info'
    function getContact() {
        showLoader();
        axios.get(APIurl)
            .then((res) => {
                setData(res.data)
                hideLoader();
            }).catch((err) => console.error(err))
    }

    useEffect(() => {
        getContact()
    }, [])
    // getContact();



    const handelDelete = (contact) => {
        setShowPopup(true)
        setSelectedID(contact.id)
    }
    const deleteContact = () => {
        axios.delete(`${APIurl}/${selectedID}`)
            .then(() => {
                getContact()
            }).catch((err) => console.error(err))
        setShowPopup(false)
        setSelectedID(0)
    }

    const handelUpdate = (contact) => {
        console.log('selectedContact', contact)
        setShowUpdatePopup(true)
        setSelectedContact(contact)
    }
    const updateContact = (updatedContact) => {
        // console.log('function called',updatedContact)
        axios.put(`${APIurl}/${selectedContact.id}`, updatedContact)
            .then(() => {
                showLoader();
                getContact();
            }).catch((err) => {
                hideLoader();
                console.error(err);
            });
        setShowUpdatePopup(false)
    }

    return (
        <>
            <div className='d-flex justify-content-end'>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">
                            <button className='btn btn-primary btn-sm' onClick={() => navigate('/')} >Home</button>
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((contact) => (
                            <tr>
                                <th scope="row">{contact.id}</th>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td> <button className='btn btn-sm btn-success' onClick={() => handelUpdate(contact)} > Edit </button> </td>
                                <td> <button className='btn btn-sm btn-danger' onClick={() => handelDelete(contact)} > Delete </button> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            <Popup
                show={showPopup}
                title="Are you Sure you want to delete this contact ?"
                initialData={selectedContact}
                onClose={() => setShowPopup(false)}
                onSave={deleteContact}
            />

            <UpdateModal
                show={showUpdatePopup}
                title="Update Contact"
                contact={selectedContact}
                onClose={() => setShowUpdatePopup(false)}
                onUpdate={updateContact}
            />


        </>
    )
}

export default List
