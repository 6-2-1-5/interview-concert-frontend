"use client";

import React, { useState } from "react";
import "./TabNavigation.css";

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabNavigationProps {
    tabs: Tab[];
    defaultActiveTab?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, defaultActiveTab }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    return (
        <div className="tab-navigation">
            <div className="tab-navigation-header">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? "tab-button-active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">{activeTabContent}</div>
        </div>
    );
};

export default TabNavigation;
