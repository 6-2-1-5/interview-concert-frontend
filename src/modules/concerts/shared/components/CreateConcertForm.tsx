"use client";

import React, { useState } from "react";
import { Save, User } from "lucide-react";
import { concertService } from "../../concert-service";
import "./CreateConcertForm.css";
import { Toasts } from "@/shared/components/ui/toast/Toast";

interface CreateConcertFormProps {
    onSuccess?: () => void;
}

const CreateConcertForm: React.FC<CreateConcertFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        seat: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.seat) {
            Toasts.error("Please fill in all fields");
            return;
        }

        const seatNumber = parseInt(formData.seat);
        if (isNaN(seatNumber) || seatNumber <= 0) {
            Toasts.error("Please enter a valid number of seats");
            return;
        }

        setIsSubmitting(true);
        try {
            await concertService.createNewConcert({
                name: formData.name,
                description: formData.description,
                seat: seatNumber,
            });

            setFormData({ name: "", description: "", seat: "" });
            Toasts.success("Create successfully");

            onSuccess?.();
        } catch (error) {
            console.error("Error creating concert:", error);
            Toasts.error("Failed to create concert. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-concert-form-container">
            <h2 className="form-title">Create</h2>

            <form onSubmit={handleSubmit} className="create-concert-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Concert Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Please input concert name"
                            className="form-input"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="seat" className="form-label">
                            Total of seat
                        </label>
                        <div className="input-with-icon">
                            <input
                                type="number"
                                id="seat"
                                name="seat"
                                value={formData.seat}
                                onChange={handleInputChange}
                                placeholder="500"
                                className="form-input"
                                min="1"
                                disabled={isSubmitting}
                            />
                            <User className="input-icon" size={20} />
                        </div>
                    </div>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please input description"
                        className="form-textarea"
                        rows={4}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        <Save size={16} />
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateConcertForm;
