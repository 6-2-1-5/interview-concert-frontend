"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { CircleCheck, X } from "lucide-react";
import "./Toast.css";

export const Toasts = {
    success: (message: string) =>
        toast(
            (t) => (
                <div className="toast-container">
                    <div className="toast-icon">
                        <CircleCheck size={20} />
                    </div>
                    <span className="toast-message">{message}</span>
                    <button className="toast-close" onClick={() => toast.dismiss(t.id)}>
                        <X size={20} />
                    </button>
                </div>
            ),
            {
                duration: 4000,
                style: {
                    background: "transparent",
                    boxShadow: "none",
                    padding: 0,
                },
            }
        ),
    error: (message: string) => toast.error(message),
};
