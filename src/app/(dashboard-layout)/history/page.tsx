"use client";

import React, { useState, useEffect } from "react";
import { historyService } from "@/modules/histories/history-service";
import { RelationHistoryDto } from "@/modules/histories/shared/types/history-dto";
import "./history.css";

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState<RelationHistoryDto[]>([]);

    const fetchHistoryData = async () => {
        try {
            const histories = await historyService.getAllHistory();
            setHistoryData(histories);
        } catch (err) {
            console.error("Error fetching history data:", err);
        }
    };

    useEffect(() => {
        fetchHistoryData();
    }, []);

    const formatDateTime = (dateValue: Date | string) => {
        const date = new Date(dateValue);
        return date
            .toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            })
            .replace(",", "");
    };

    const getActionLabel = (action: string) => {
        switch (action.toLowerCase()) {
            case "reserve":
                return "Reserve";
            case "cancel":
                return "Cancel";
            default:
                return action;
        }
    };

    return (
        <div className="history-page">
            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Date time</th>
                            <th>Username</th>
                            <th>Concert name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="empty-state">
                                    No history records found
                                </td>
                            </tr>
                        ) : (
                            historyData.map((history) => (
                                <tr key={history.id}>
                                    <td>{formatDateTime(history.createdAt)}</td>
                                    <td>{history.user.name}</td>
                                    <td>{history.concert.name}</td>
                                    <td>{getActionLabel(history.action)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryPage;
