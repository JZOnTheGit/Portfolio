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
            button.textContent = 'View_Sorting_Algorithms';
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
    const token = config.githubToken;
    
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    const fetchWithAuth = (url) => fetch(url, { headers });

    try {
        // Fetch user data
        const userResponse = await fetchWithAuth(`${apiBase}/users/${username}`);
        if (!userResponse.ok) {
            throw new Error(`Failed to fetch user data: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetchWithAuth(`${apiBase}/users/${username}/repos?sort=updated`);
        if (!reposResponse.ok) {
            throw new Error(`Failed to fetch repos: ${reposResponse.status}`);
        }
        const repos = await reposResponse.json();
        
        // Calculate total stars
        const totalStars = Array.isArray(repos) ? 
            repos.reduce((acc, repo) => acc + repo.stargazers_count, 0) : 0;
        
        // Calculate total contributions from commits
        let totalContributions = 0;
        if (Array.isArray(repos)) {
            for (const repo of repos) {
                try {
                    const commitsResponse = await fetchWithAuth(
                        `${apiBase}/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`
                    );
                    if (commitsResponse.ok) {
                        const commits = await commitsResponse.json();
                        if (Array.isArray(commits)) {
                            totalContributions += commits.length;
                        }
                    }
                } catch (error) {
                    console.warn(`Failed to fetch commits for ${repo.name}:`, error);
                }
            }
        }
        
        // Update stats immediately with what we have
        const statsContainer = document.querySelector('.github-stats');
        if (statsContainer) {
            document.getElementById('repo-count').textContent = userData.public_repos || '0';
            document.getElementById('stars-count').textContent = totalStars;
            document.getElementById('contribution-count').textContent = totalContributions;
        }
        
        // Fetch recent activity
        const activityResponse = await fetchWithAuth(`${apiBase}/users/${username}/events/public`);
        if (!activityResponse.ok) {
            throw new Error(`Failed to fetch activity: ${activityResponse.status}`);
        }
        const activity = await activityResponse.json();
        
        // Check if activity is an array before using slice
        const recentActivity = (Array.isArray(activity) ? activity.slice(0, 5) : []).map(event => {
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

        // Only try to update the DOM if the element exists
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = recentActivity;
        }

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Update UI to show error state
        const statsContainer = document.querySelector('.github-stats');
        if (statsContainer) {
            ['repo-count', 'stars-count', 'contribution-count'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = '-';
            });
        }
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = `<div class="error-message">
                Failed to load GitHub activity. Please try again later.
            </div>`;
        }
    }
}

// Initialize GitHub dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.github-dashboard')) {
        fetchGitHubActivity();
    }
});



