window.onload = function () {
    console.log("🚀 Custom Swagger UI Loaded");

    // Wait for Swagger UI to finish rendering
    setTimeout(() => {
        // Inject custom header banner
        const banner = document.createElement("div");
        banner.id = "custom-banner";
        banner.innerHTML = "🚀 Enterprise GenAI Assistant — Custom API Documentation";
        document.body.prepend(banner);

        // Add GitHub + LinkedIn icons
        const social = document.createElement("div");
        social.id = "social-links";
        social.innerHTML = `
            <a href="https://github.com/yourusername" target="_blank">
                <img class="social-icon" src="/static/github.png">
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank">
                <img class="social-icon" src="/static/linkedin.png">
            </a>
        `;

        document.body.prepend(social);

    }, 400); // Delay fixes blank screen issue
};
