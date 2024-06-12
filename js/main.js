function scrollToAbout() {
    const aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
}

function MoreProjects(){
    //function than sends user to a new page with more projects
    window.location.href = "https://j-singh.net/more_projects";

}

function Back_Home(){
    //function than sends user back to the home page
    window.location.href = "https://j-singh.net/";
}