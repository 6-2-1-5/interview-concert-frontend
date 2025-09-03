"use client";

import React, { useState, useEffect } from "react";
import { User, Award, CircleX, Trash2 } from "lucide-react";
import StatCard from "@/modules/concerts/shared/components/StatCard";
import TabNavigation from "@/modules/concerts/shared/components/TabNavigation";
import ConcertCard from "@/modules/concerts/shared/components/ConcertCard";
import CreateConcertForm from "@/modules/concerts/shared/components/CreateConcertForm";
import { concertService } from "@/modules/concerts/concert-service";
import { Toasts } from "@/shared/components/ui/toast/Toast";
import ConfirmDialog from "@/shared/components/ui/dialog/ConfirmDialog";
import "./admin-home.css";
import { Concert } from "@/modules/concerts/shared/types/concert-entity";

const AdminHomePage = () => {
    const [selectedConcertId, setSelectedConcertId] = useState<string | null>(null);
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; concertId: string; concertName: string }>({
        isOpen: false,
        concertId: "",
        concertName: "",
    });

    const fetchConcerts = async () => {
        try {
            const concertData = await concertService.getAllConcerts();
            setConcerts(concertData);
        } catch (err) {
            console.error("Error fetching concerts:", err);
        }
    };

    const handleDeleteClick = (concertId: string, concertName: string) => {
        setDeleteDialog({ isOpen: true, concertId, concertName });
    };

    const handleDeleteConfirm = async () => {
        try {
            await concertService.removeConcert(deleteDialog.concertId);
            Toasts.success(`Deleted successfully`);
            fetchConcerts();

            if (selectedConcertId === deleteDialog.concertId) {
                setSelectedConcertId(null);
            }
        } catch (error) {
            console.error("Error deleting concert:", error);
            Toasts.success("Failed to delete concert");
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ isOpen: false, concertId: "", concertName: "" });
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    const selectedConcert = selectedConcertId ? concerts.find((c) => c.id === selectedConcertId) : null;
    const totalStats = {
        seat: concerts.reduce((sum, c) => sum + c.seat, 0),
        reservedSeat: concerts.reduce((sum, c) => sum + c.reservedSeat, 0),
        cancelledSeat: concerts.reduce((sum, c) => sum + c.cancelledSeat, 0),
    };

    const displayStats = selectedConcert || totalStats;

    const overviewContent = (
        <div className="concerts-list">
            {concerts.length === 0 ? (
                <div className="empty-state">
                    <p>No concerts. Create your first concert</p>
                </div>
            ) : (
                concerts.map((concert) => (
                    <div
                        key={concert.id}
                        className={`concert-item ${selectedConcertId === concert.id ? "selected" : ""}`}
                        onClick={() => setSelectedConcertId(selectedConcertId === concert.id ? null : concert.id)}
                    >
                        <ConcertCard
                            id={concert.id}
                            name={concert.name}
                            description={concert.description}
                            seat={concert.seat}
                            actions={
                                <button
                                    className="btn btn-danger"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(concert.id, concert.name);
                                    }}
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            }
                        />
                    </div>
                ))
            )}
        </div>
    );

    const createContent = (
        <CreateConcertForm
            onSuccess={() => {
                fetchConcerts(); // refresh concert list
            }}
        />
    );

    const tabs = [
        { id: "overview", label: "Overview", content: overviewContent },
        { id: "create", label: "Create", content: createContent },
    ];

    return (
        <div className="admin-home">
            <div className="stats-grid">
                <StatCard title="Total of seats" value={displayStats.seat.toString()} icon={<User size={24} />} color="blue" />
                <StatCard title="Reserve" value={displayStats.reservedSeat.toString()} icon={<Award size={24} />} color="green" />
                <StatCard title="Cancel" value={displayStats.cancelledSeat.toString()} icon={<CircleX size={24} />} color="red" />
            </div>

            <div className="admin-content">
                <TabNavigation tabs={tabs} defaultActiveTab="overview" />
            </div>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                itemName={deleteDialog.concertName}
            />
        </div>
    );
};

export default AdminHomePage;
