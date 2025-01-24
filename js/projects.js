// Separate project definitions from their order
const projectData = {
    tiktokFinder: {
        title: "TikTok Video 'Upload Date Finder'",
        description: `This project was started by a user request on "TikTok", it tests my ability to work with binary code and how it can be manipulated to obtain specific data. <br><br> The project works by getting the needed didgits from the "TikTok" URL. <br> Converting them to binary, getting the first 32 didgits of that binary number then converting back to denary. <br> finally converting that denary value to the UNIX Time Code to obtain the exact date the video was uploaded.<br><br> Finally puttting all that into the JavaScript into the website and linking it with the html button then finishing with the css.`,
        projectLink: "https://ttudf.j-singh.net",
        sourceLink: "https://github.com/JZOnTheGit/TikTokVideoDate"
    },
    ninjaParkour: {
        title: "Ninja Parkour Unity Game",
        description: `This project was made in 2021 when i was learning how to develop games in the Unity Game Engine. <br><br> This project uses a movement system, grappling system, and a simple UI interface that creates a parkour game where the user jumps through platforms, grapples and completes multiple levels. <br><br> It was created using scripts within unity that were using the C# language. <br> I also was able to integrate daabases and remote features from 3rd party systems like Firebase.`,
        projectLink: "https://d3v1l.itch.io/ninja-parkour",
        sourceLink: null
    },
    discordBot: {
        title: "Discord.Js V14.2.0 Multi-Functional Bot (ZETA)",
        description: `This project was one of my last bots i developed using discords API (Discord.js V14.2) <br><br> This bot had multiple function and had been updated last in 2022 with slash commands which were recently introduced at the time. <br> The bot could do multple Moderation commands like, ban, kick, unban, mute. Fun commands like, catsay, avatar, 8ball, ping. and many other commands which can be viewed in the source files. <br><br> From previoud bots, i have lerant to integrate multiple APIs like Youtubes and Spotifys. And integradted Databaes like MongoDB and Firebase.<br>The bot is curently offline.`,
        projectLink: null,
        sourceLink: "https://github.com/JZOnTheGit/ZETA-DiscordBot"
    },
    mobileGames: {
        title: "Mobile 2D Games",
        description: `I have created multiple 2D mobile games available for the google play store, however over the course of few years, I havent updated any of the games and lost the source code, therefore losing access to the account. <br><br>One of the games were a simple drag the bottom slider to move the space ship left or right to dodge the obstacles, this was created in a low-code game engine called Buildbox. <br>Another were a infinite horizontal scroller where you tap to make your player jump and dodge obstacles, this was also created on Buildbox.<br> <br>The third game was when I moved to Unity and made a 3D multi-level game where the player walks around the arena eliminating Robots to end up getting to the last level and defeating the final boss.<br>This game was my first 3D game and also included an open world driving simulator. <br><br> I have lost the source code, however I have an OLD WEBSITE that includes my past mobile games. <br>This site was made in 2020 on a website template, before I focused on building my own sites from code<br><br>LINKS IN SITE MIGHT NOT WORK DUE TO OLD RESOURCES <br><br> WEBSITE HAS BEEN MODIFIED TO REMOVE OLD BRANDING AND FIX ISSUES (Might be missing elements)`,
        projectLink: "https://teamghost.webador.co.uk",
        sourceLink: null
    },
    botBusiness: {
        title: "Past Discord Bot Business",
        description: `Other than my final Discord Bot, on the home page, I previously started a business where I created Discord Bots for multiple servers. <br><br>These bots were created with Discords API using D.Js V12. <br>These bots each had different and multiple function, fitted for the client in mind.<br><br> Below is an OLD WEBSITE that I have created in 2021 using a web builder. <br>This site showcases the clients I have worked with and proof of an previous independent business experience.<br><br>ELEMENTS MIGHT BE MISSING OR MODIFIED`,
        projectLink: "https://d3v1l-bot-coop.webador.co.uk/?_gl=1*15wdtev*_ga*NTc2OTg3MTUxLjE3MTgyMjY3MTI.*_ga_E6PZPGE4QM*MTcxODIyNjcxMS4xLjEuMTcxODIyODYzNy42MC4wLjA.",
        sourceLink: null
    },
    robloxInjector: {
        title: "Roblox LUA Script Injector (Exploit)",
        description: `I have programmed an Windows application using Visual Studio that included a simple compact GUI, where the User can activate the Client, incert the LUA script and inject it into the Roblox Client <br><br>(All exploiting goes againt Roblox ToS)<br><br>This application included an activation key, that resets every certain time limit, where the user goes through a link with Ads to get the new key. <br>(This allowed me to monitize and earn Ad revenue)<br><br>The user then injects the API into the Game Client, Inputs the LUA script, then runs the script.<br><br>This gave me experience in reverse engineering and explointing applications to find vulnerabilities, which then can be reported to the company for them to fix. (Exploit is now patched) <br><br>SOURCE CODE AND PROJECT LINK ARE BEING FOUND, SINCE THE PROJECT IS OLD AND IS ON A PREIVIOUSLY OWNED COMPUTER.`,
        projectLink: null,
        sourceLink: null
    },
    ideaFlow: {
        title: "ideaFlow",
        description: `ideaFlow, a project that uses AI to generate content ideas from PDFs and Website Links for content creators<br><br>This is a project that I have been working on for about a week, its a react based web application that uses Coheres AI to generate content indeas for Tiktok, Youtube and Twitter/X from PDFs and Website Links.<br><br> The project uses React, Cohere api, Firebase, Stripe API, Cloudflare and Vercel. <br><br> React is used to create the website, Cohere api is used to generate the content ideas, Firebase is used to store the content ideas and authenticate users, Stripe API is used to handle payments, Vercel is used to host the backend and Cloudflare is used to host the website.<br><br> Check out the website to see how it works.`,
        projectLink: "https://ideaflow.uk",
        sourceLink: null
    }
};

// Define the order of projects (just reference their keys)
const projectOrder = [
    'ideaFlow',
    'tiktokFinder',
    'discordBot',
    'ninjaParkour',
    'mobileGames',
    'botBusiness',
    'robloxInjector'
    
];

// Generate the projects array from the order
const projects = projectOrder.map((key, index) => ({
    id: index + 1,
    ...projectData[key]
}));

// Function to generate project HTML
function generateProjectHTML(project) {
    return `
    <div class="project-card">
        <h3 class="project-title">[${project.id}] ${project.title}</h3>
        <p class="project-description">
            ${project.description}<br><br>
            ${project.projectLink ? `<a href="${project.projectLink}" target="_blank" style="text-decoration: none;">Project Link</a>` : ''}
            ${project.projectLink && project.sourceLink ? ' / / / ' : ''}
            ${project.sourceLink ? `<a href="${project.sourceLink}" target="_blank" style="text-decoration: none;">Source Code</a>` : ''}
        </p>
    </div>`;
}

// Function to load projects into container
function loadProjects(containerId, start = 0, count = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const projectsToShow = count ? projects.slice(start, start + count) : projects.slice(start);
    
    projectsToShow.forEach(project => {
        const projectSection = document.createElement('div');
        projectSection.className = 'project-card-section';
        projectSection.innerHTML = generateProjectHTML(project);
        container.appendChild(projectSection);
    });
} 