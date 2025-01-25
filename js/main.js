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

function scrollToGitHub() {
    const githubSection = document.querySelector('.github-dashboard');
    if (githubSection) {
        githubSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// GitHub Activity Dashboard
async function fetchGitHubActivity() {
    const username = 'JZOnTheGit';
    const apiBase = 'https://api.github.com';

    try {
        // Fetch user data
        const userData = await fetch(`${apiBase}/users/${username}`).then(r => r.json());
        
        // Fetch repositories
        const repos = await fetch(`${apiBase}/users/${username}/repos?sort=updated`).then(r => r.json());
        
        // Calculate total stars
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        
        // Update enhanced stats
        document.getElementById('repo-count').textContent = userData.public_repos;
        document.getElementById('stars-count').textContent = totalStars;
        document.getElementById('contribution-count').textContent = userData.contributions || '0';

        // Fetch and format recent activity
        const activity = await fetch(`${apiBase}/users/${username}/events/public`).then(r => r.json());
        const recentActivity = activity.slice(0, 5).map(event => {
            const date = new Date(event.created_at).toLocaleDateString();
            let message = '';
            let icon = '';
            
            switch(event.type) {
                case 'PushEvent':
                    icon = '🔨';
                    message = `Pushed ${event.payload.commits?.length || 0} commits to ${event.repo.name}`;
                    break;
                case 'CreateEvent':
                    icon = '🎉';
                    message = `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${event.repo.name}`;
                    break;
                case 'ForkEvent':
                    icon = '🔱';
                    message = `Forked ${event.repo.name}`;
                    break;
                case 'WatchEvent':
                    icon = '⭐';
                    message = `Starred ${event.repo.name}`;
                    break;
                case 'IssuesEvent':
                    icon = '📝';
                    message = `${event.payload.action} issue in ${event.repo.name}`;
                    break;
                default:
                    icon = '📌';
                    message = `Activity in ${event.repo.name}`;
            }
            
            return `<div class="activity-item">
                <div class="activity-icon">${icon}</div>
                <div class="activity-content">
                    <span class="activity-message">${message}</span>
                    <span class="activity-date">${date}</span>
                </div>
            </div>`;
        }).join('');

        document.querySelector('.activity-list').innerHTML = recentActivity;

        // Add top repositories section
        const topRepos = repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3)
            .map(repo => `
                <div class="top-repo">
                    <h4>${repo.name}</h4>
                    <p>${repo.description || 'No description'}</p>
                    <div class="repo-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🔄 ${repo.forks_count}</span>
                        <span>👁️ ${repo.watchers_count}</span>
                    </div>
                </div>
            `).join('');

        // Add this HTML to show top repos
        document.querySelector('.github-container').insertAdjacentHTML('beforeend', `
            <div class="top-repositories">
                <h4>Top Repositories</h4>
                <div class="repo-grid">${topRepos}</div>
            </div>
        `);

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        document.querySelector('.activity-list').innerHTML = 'Failed to load GitHub activity';
    }
}

// Initialize GitHub dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.github-dashboard')) {
        fetchGitHubActivity();
    }
});



