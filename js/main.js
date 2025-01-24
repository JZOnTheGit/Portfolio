function scrollToAbout() {
    const aboutSection = document.getElementById("social_section");
    aboutSection.scrollIntoView({ behavior: "smooth" });
}

function MoreProjects() {
    const button = document.getElementById('ProjectBtn-button');
    button.disabled = true;
    button.textContent = 'Loading...';
    
    try {
        window.location.href = "more_projects.html";
    } catch (error) {
        button.disabled = false;
        button.textContent = 'More_Projects';
        console.error('Navigation failed:', error);
    }
}

function Back_Home() {
    const button = document.querySelector('.name');
    if (button) {
        button.style.opacity = '0.5';
    }
    
    try {
        window.location.href = "index.html";
    } catch (error) {
        if (button) {
            button.style.opacity = '1';
        }
        console.error('Navigation failed:', error);
    }
}

function MoreSites() {
    const button = document.getElementById('WebsiteBtn-button');
    button.disabled = true;
    button.textContent = 'Loading...';
    
    try {
        window.location.href = "more_sites.html";
    } catch (error) {
        button.disabled = false;
        button.textContent = 'More_Websites';
        console.error('Navigation failed:', error);
    }
}

function SortingAlgorithms() {
    const button = document.querySelector('[onclick="SortingAlgorithms()"]');
    if (button) {
        button.disabled = true;
        button.textContent = 'Loading...';
    }
    
    try {
        window.location.href = "algorithms.html";
    } catch (error) {
        if (button) {
            button.disabled = false;
            button.textContent = 'View Sorting Algorithms';
        }
        console.error('Navigation failed:', error);
    }
}

function toggleMenu() {
    const navigation = document.querySelector('.navigation');
    navigation.classList.toggle('show');
}

// Defer non-critical JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Load social media widgets after page load
    const loadSocialScripts = () => {
        const script = document.createElement('script');
        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
        document.body.appendChild(script);
    };
    
    // Load after a slight delay
    setTimeout(loadSocialScripts, 2000);
});



