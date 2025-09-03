export const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // For this example, we will check for a user ID in header
    // In a real world, this would come from JWT token or session
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.id) {
                    headers["user-id"] = user.id;
                }
            } catch (error) {
                console.error("Failed to parse user data for headers:", error);
            }
        }
    }

    return headers;
};
