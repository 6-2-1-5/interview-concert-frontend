"use client";

import React from "react";
import { RelationHistoryDto } from "../types/history-dto";
import { formatDateTime } from "@/shared/utils/date";
import "./HistoryTable.css";

type Props = {
    historyData: RelationHistoryDto[];
};

const HistoryTable = ({ historyData }: Props) => {
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

export default HistoryTable;
