import React, { useState } from 'react'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'
// const { showLoader, hideLoader } = useLoader();

const Create = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required'
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email is invalid'
        return ''
      case 'phone':
        if (!value.trim()) return 'Phone is required'
        if (!/^\d{10}$/.test(value)) return 'Phone must be 10 digits'
        return ''
      default:
        return ''
    }
  }

  const validateForm = (data) => {
    const newErrors = {}
    Object.keys(data).forEach((key) => {
      const err = validateField(key, data[key])
      if (err) newErrors[key] = err
    })
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)

    if (submitted) {
      const err = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    const newErrors = validateForm(formData)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      axios.post(
        'https://6a6d8e27eb8865c4bf490643.mockapi.io/contact-info/api/employee-contact-info',
        formData
      )
        .then(() => {
          navigate('/contact-list')
        })
        .catch((err) => {
          console.error('Error creating contact:', err)
        })
    }
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Create