function scrollToAbout() {
    const aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
}

function MoreProjects(){
    //function than sends user to a new page with more projects
    window.location.href = "more_projects.html";

}

function Back_Home(){
    //function than sends user back to the home page
    window.location.href = "index.html";
}

function MoreSites(){
    //function that sends the user to the More Websites page
    window.location.href = "more_sites.html";
}



