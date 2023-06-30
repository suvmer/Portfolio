//header bg logic
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
  }

//modal img logic
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

//Slidebar logic
const slidesContainer = document.getElementById("slides");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("arrow-left");
const nextButton = document.getElementById("arrow-right");

let isDown = false;
let startX;
let scrollLeft;

nextButton.addEventListener("click", () => {
  slidesContainer.scrollLeft += slide.clientWidth;
});
prevButton.addEventListener("click", () => {
  slidesContainer.scrollLeft -= slide.clientWidth;
});

slidesContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slidesContainer.offsetLeft;
  scrollLeft = slidesContainer.scrollLeft;
});
slidesContainer.addEventListener('mouseleave', () => { isDown = false; });
slidesContainer.addEventListener('mouseup', () => {  isDown = false; });
slidesContainer.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slidesContainer.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slidesContainer.scrollLeft = scrollLeft - walk;
});