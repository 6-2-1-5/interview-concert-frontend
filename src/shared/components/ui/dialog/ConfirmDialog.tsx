"use client";

import React from "react";
import { X } from "lucide-react";
import "./ConfirmDialog.css";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    itemName?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure to delete?",
    itemName,
    confirmText = "Yes, Delete",
    cancelText = "Cancel",
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog-container">
                <div className="dialog-icon">
                    <div className="dialog-icon-circle">
                        <X size={24} />
                    </div>
                </div>

                <div className="dialog-content">
                    <h3 className="dialog-title">{title}</h3>
                    {itemName && <p className="dialog-title">"{itemName}"</p>}
                </div>

                <div className="dialog-actions">
                    <button className="dialog-button dialog-button-cancel" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className="dialog-button dialog-button-confirm" onClick={handleConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
