const aboutButton = document.querySelector("#about-button");

aboutButton.addEventListener("click", () => {
  const aboutSection = document.querySelector("#about");
  aboutSection.scrollIntoView({ behavior: "smooth" });
});
