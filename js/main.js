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
    
    setTimeout(loadSocialScripts, 2000);
    if (document.querySelector('.progress-bar')) {
        animateSkillBars();
    }
    if (document.querySelector('.stat-number')) {
        animateStats();
    }
});

function searchProjects(query) {
    const filtered = projects.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
    );
    updateProjectDisplay(filtered);
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const bars = document.querySelectorAll('.progress-bar');
    if (!bars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                if (!level) return;
                bar.style.transform = `scaleX(${level / 100})`;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

// Animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        if (isNaN(target)) return;
        let current = 0;
        const increment = target / 30; // Animate over 30 steps
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(stat);
            }
        });
        
        observer.observe(stat);
    });
}

function scrollToJourney() {
    const journeySection = document.querySelector('.timeline-section');
    if (journeySection) {
        journeySection.scrollIntoView({ behavior: 'smooth' });
    }
}



