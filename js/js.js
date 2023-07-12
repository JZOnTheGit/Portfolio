/*document.addEventListener("keydown", function (event){
    if (event.ctrlKey){
       event.preventDefault();
    }
    if(event.keyCode == 123){
       event.preventDefault();
    }
});

document.addEventListener('contextmenu', 
     event => event.preventDefault()
);*/


/*

/*Test console log when button pressed*/
/*
function test(){
      console.log("test");
}

/*call test() when space bar is pressed*/
/*
document.addEventListener('keydown', function(event) {
      if(event.keyCode == 32) {
            test();
      }
});
*/

/*JS for progress bar that loads when page is loaded*/
window.onload = function() {
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
            if (width >= 100) {
                  clearInterval(id);
                  /*make bar disappear when page is loaded*/
                  elem.style.display = "none";
                  console.log("page loaded");

            } else {
                  width++;
                  elem.style.width = width + "%";
                  console.log("loading");
            }
      }
      
};


/*Loading bar*/
/*
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

*/