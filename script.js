const header = document.querySelector('.header')
window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if(currentScrollPos >= 50) {
        header.style.backgroundColor = `rgba(38, 0, 255, ${Math.min(1, (currentScrollPos-150)/400)})`;
        header.style.boxShadow = `rgba(0, 0, 0, ${Math.min(0.4, (currentScrollPos-150)/700)}) 0px 4px 10px`;
    } else {
        header.style.backgroundColor = "rgba(38, 0, 255, 0)";
        header.style.boxShadow = `rgba(0, 0, 0, 0) 0px 4px 10px`;
    }
    //console.log(currentScrollPos);
  }


function openImg(path) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const img = document.createElement("img");
    img.classList.add("modal_img");
    img.src = "/images/"+path;
    modal.appendChild(img);
    modal.addEventListener("click", closeImg);
    document.body.appendChild(modal);
}

function closeImg(e) {
    if(e.target.tagName == "IMG")
        return;
    e.target.removeEventListener("click", closeImg);
    document.body.removeChild(e.target);
}