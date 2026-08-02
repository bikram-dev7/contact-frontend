import { useEffect, useState } from "react";

const UpdateModal = ({
    show,
    title,
    contact,
    onClose,
    onUpdate,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name ?? "",
                email: contact.email ?? "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
            });
        }

        // Clear errors whenever a new contact is loaded
        setErrors({
            name: "",
            email: "",
        });
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove error while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!contact) return;

        if (!validateForm()) return;

        const updatedContact = {
            ...contact,
            ...formData,
        };
        onUpdate(updatedContact);

        console.log('contact update', contact, updatedContact)
    };

    if (!show) return null;

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control ${errors.name ? "is-invalid" : ""
                                        }`}
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""
                                        }`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default UpdateModal;