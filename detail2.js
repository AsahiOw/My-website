alert("Noted: The content might not load correctly depend on the Internet connection. I dont want to use loading screen so this is what I have.")
//left and right function for Blue Archive card
let activeIndex = 0;

const groups = document.getElementsByClassName("card-group");

const LeftClick = () => {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
        
  currentGroup.dataset.status = "after";
  
  nextGroup.dataset.status = "becoming-active-from-before";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}

const RightClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
  
  currentGroup.dataset.status = "before";
  
  nextGroup.dataset.status = "becoming-active-from-after";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}

//photo slideshow
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 1.5;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${(100 + nextPercentage)}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);





// name card glitch effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const screen = document.querySelector(".screen"),
      name = document.querySelector(".name");

screen.onmouseenter = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    name.innerText = name.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return name.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= name.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}