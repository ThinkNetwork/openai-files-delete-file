window.function = async function(api_key, file_id) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate File ID
    if (!file_id.value) {
        return "Error: File ID is required.";
    }

    // API endpoint URL
    const apiUrl = `https://api.openai.com/v1/files/${file_id.value}`;

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${api_key.value}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
