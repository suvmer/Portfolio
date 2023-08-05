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
function openImg(path, start="/images/") {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const img = document.createElement("img");
    img.classList.add("modal_img");
    img.src = start+path;
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

window.onload = () => {
  var onOpen = (url) => {
      openImg(url, "")
      console.log("opened " + url);
  }

  const sliderWrapper = document.querySelector(".slider");
  const slider = document.querySelector(".slider__body");
  const [arrowLeft, arrowRight] = document.querySelectorAll(".slider__arrow");
  let startPos = null; //состояние на момент нажатия слайдера
  
  //ширина картинок внутри слайдера
  let widths = [...slider.children].map(el => el.clientWidth);
  sliderWrapper.style.cssText = `width: ${Math.max(...widths)}px;`;

  let imgCount = slider.children.length;
  let offsetStart = slider.clientWidth/2 - slider.children[0].clientWidth/2;
  let offsetEnd = slider.clientWidth/2 - slider.children[imgCount-1].clientWidth/2;
  slider.children[0].style.cssText = `margin-left: ${offsetStart}px;`;
  slider.children[imgCount-1].style.cssText = `margin-right: ${offsetEnd}px;`;

  let startPoints = [];
  [...slider.children].reduce((acc, el) => {
      startPoints.push(acc + el.clientWidth/2); //относительные координаты середин слайдов
      return acc + el.clientWidth;
  }, offsetStart);

  /**
   * Возвращает индекс картинки, на которую попадает центр окна слайдера
   * @returns индекс
   */
  function getCur() {
      return [...slider.children].reduce((prev, el, ind) => {
          let viewPos = slider.scrollLeft + slider.clientWidth/2;
          return (startPoints[ind] - widths[ind]/2 <= viewPos && startPoints[ind] + widths[ind]/2 >= viewPos ? ind : prev);
      }, 0);
  }
  /**
   * Возвращает индекс соседа, в сторону которого отклонился
   *  центр слайдера более, чем на 1/6 от ширины картинки.
   * Если отклонение менее 1/6, возвращается текущее изображение
   * @returns индекс
   */
  function getClosest(cur = getCur()) {
      const wind = slider.scrollLeft + slider.clientWidth/2;
      if(wind <= startPoints[cur] - slider.children[cur].clientWidth/6)
          return Math.max(0, cur-1);
      if(wind >= startPoints[cur] + slider.children[cur].clientWidth/6)
          return Math.min(imgCount-1, cur+1);
      return cur;
  }
  /**
   * Выравнивает слайдер согласно текущем положению
   * @param {number} cur Слайд до начала скролла
   * @param {number?} dir Принудительно указать направление движения
   */
  const move = (cur, dir = null) => {
      let index = getCur(); //индекс картинки, на который двигать
      if(index === cur) //если центр попал на ту же картинку
          index = getClosest(cur); //то может сдвига достаточно для соседа
      if(dir) //если принудительно указано направление
          index = cur + dir;
      slider.scrollTo({left: startPoints[index] - slider.clientWidth/2, top: 0, behavior: "smooth"});
  }

  //startPos = [x, y, скролл слайдера на момент нажатия, наведённый слайд на момент нажатия]
  function mouseDown(event) {
      startPos = [event.clientX, event.clientY, slider.scrollLeft, getCur()];
  }
  function mouseUp(event) {
      if(!startPos)
          return;
      if(dist(startPos[0], startPos[1], event.clientX, event.clientY) < 30)
          onOpen(slider.children[startPos[3]].src);
      move(startPos[3]);
      startPos = null;
  }
  function mouseOut(event) {
      if(!startPos)
          return;
      if(dist(startPos[0], startPos[1], event.clientX, event.clientY) >= 30)
          move(startPos[3]);
      startPos = null;
  }
  function dist(x1, y1, x2, y2) {
      return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
  }
  function mouseMove(event) {
      event.preventDefault();
      if(!startPos)
          return;
      const dx = startPos[0] - event.clientX;
      slider.scrollTo({left: startPos[2] + 2*dx, top: 0});
  }
  slider.addEventListener('mousemove', mouseMove)
  slider.addEventListener('mouseout', mouseOut)
  slider.addEventListener('mousedown', mouseDown)
  slider.addEventListener('mouseup', mouseUp)
  arrowLeft.addEventListener('click', () => move(getCur(), -1))
  arrowRight.addEventListener('click', () => move(getCur(), 1))
}