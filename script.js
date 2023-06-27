const header = document.querySelector('.header')
window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if(currentScrollPos >= 50) {
        header.style.backgroundColor = `rgba(38, 0, 255, ${Math.min(1, (currentScrollPos-150)/400)})`;
        header.style.boxShadow = `rgba(0, 0, 0, ${Math.min(0.5, (currentScrollPos-150)/700)}) 0px 5px 25px`;
    } else {
        header.style.backgroundColor = "rgba(38, 0, 255, 0)";
        header.style.boxShadow = `rgba(0, 0, 0, 0) 0px 5px 25px`;
    }
    console.log(currentScrollPos);
  }