"use client";

import React, { useState, useEffect } from "react";
import { historyService } from "@/modules/histories/history-service";
import { RelationHistoryDto } from "@/modules/histories/shared/types/history-dto";
import HistoryTable from "@/modules/histories/shared/components/HistoryTable";

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState<RelationHistoryDto[]>([]);

    const fetchHistoryData = async () => {
        try {
            const histories = await historyService.getMyHistory();
            setHistoryData(histories);
        } catch (err) {
            console.error("Error fetching history data:", err);
        }
    };

    useEffect(() => {
        fetchHistoryData();
    }, []);

    return <HistoryTable historyData={historyData} />;
};

export default HistoryPage;
