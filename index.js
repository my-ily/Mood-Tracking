
let feelingInput=document.querySelector("#feelingInput");
let feelingList = document.querySelector(".feelingList")
let emojiPicked2 = document.querySelector(".section2Picked")
let emojiPicked3 = document.querySelector(".section3Picked")

let currentFeelingIndex = null;


const moods = [
  { emoji: "😀", name: "Happy", color: "#FFD93D" },
  { emoji: "😢", name: "Sad", color: "#6C63FF" },
  { emoji: "😡", name: "Angry", color: "#FF4C4C" },
  { emoji: "😴", name: "Tired", color: "#A0AEC0" },
  { emoji: "🤩", name: "Excited", color: "#FF8C00" },
  { emoji: "😌", name: "Relaxed", color: "#4CAF50" },
  { emoji: "😎", name: "Confident", color: "#00BFFF" },
  { emoji: "😔", name: "Lonely", color: "#8A2BE2" },
  { emoji: "😱", name: "Anxious", color: "#FF69B4" },
  { emoji: "😍", name: "In Love", color: "#FF1493" }
];





moods.forEach((mood,i)=>{
    let btn = document.createElement("button");
     btn.classList.add("mood-card"); 
    btn.innerHTML=`
    ${mood.emoji}
    <div>${mood.name}</div>
    `
    btn.style.background=mood.color
   btn.onclick = () => selectedFeeling(i)
    feelingList.appendChild(btn)
})


function selectedFeeling(index){
currentFeelingIndex = index;
document.body.style.background= moods[index].color;

setTimeout(() => {
     ShowSection(2) 
}, 500);


emojiPicked2.appendChild(ChosenFeeling(moods[index],'',true))
}

const sections ={
    1:document.querySelector("#section1"),
      2:document.querySelector("#section2"),
        3:document.querySelector("#section3"),
        4:document.querySelector("#section4")
}

function ShowSection(index){
    Object.values(sections).forEach((s)=>{
        s.style.display="none";
    })
    sections[index].style.display="block";
}

function ChosenFeeling(mood , reason = '' , big = false,date=''){
let card = document.createElement("div");
    if (big){
    //     card.style.width = "500px"
    //  card.style.height = "500px"
    card.classList.add("big")
    };
card.classList.add("card")
card.style.backgroundColor = mood.color;
card.innerHTML = `
    <div class="emoji" style="font-size:${big ? "50px" : "35px"}">${mood.emoji}</div>
    <div class="mood-name" style="font-size:${big ? "24px" : "18px"}">${mood.name}</div>
    <div class="mood-text">${date}</div>
    ${reason ? `<div class="mood-text">${reason}</div>` : ""}
  `;
  return card ;
}

function renderMoods(showOnlyLatest = false) {
  const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
  let AllMoods = document.querySelector(".AllMoods");
  AllMoods.innerHTML = "";

  if (showOnlyLatest) {
    const last = savedMoods[savedMoods.length - 1];
    if (last) {
      let card = ChosenFeeling(last, last.reason, false, last.date);
    //   card.style.backgroundColor = last.color;  
      AllMoods.appendChild(card);
    }
    return;
  }

  const frag = document.createDocumentFragment();
  savedMoods.forEach((m) => {
    let card = ChosenFeeling(m, m.reason, false, m.date);
    card.style.backgroundColor = m.color;  
    frag.appendChild(card);
  });
  AllMoods.appendChild(frag);

  drawMoodChart();
}



function FullInfo(){
       let myreason = feelingInput.value.trim()
    if (myreason === '') {
alert("must write a reason")
return ;
        }   

 
     const mood = moods[currentFeelingIndex]
   const date = new Date().toLocaleString();
console.log(date);

 const MoodEntry = {
    emoji: mood.emoji,
    name: mood.name,
    color: mood.color,
    reason: myreason,
    date: date
  };
const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
savedMoods.push(MoodEntry);
localStorage.setItem("moods", JSON.stringify(savedMoods));



         //  2
    emojiPicked2.innerHTML = "" 
    emojiPicked2.appendChild(ChosenFeeling(mood,myreason,true))

    //  3
    emojiPicked3.innerHTML = "" 
    emojiPicked3.appendChild(ChosenFeeling(mood,myreason,true,date))

renderMoods()
    ShowSection(3)

    feelingInput.value = "";
    document.body.style.background=''
}
document.querySelector(".send").addEventListener("click", FullInfo)





document.querySelector(".chartbtn").addEventListener("click",drawMoodChart)
function drawMoodChart() {
  const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
  // عدّ كل مود حسب الاسم
  const moodCounts = moods.map(mood => {
    return savedMoods.filter(entry => entry.name === mood.name).length;
  });

  const ctx = document.getElementById('mood-chart');
  if (!ctx) return; 


  if (window.moodChartInstance) {
    window.moodChartInstance.destroy();
  }

  window.moodChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: moods.map(m => m.emoji ),
      datasets: [{
        label: 'Mood Counts',
        data: moodCounts,
        backgroundColor: moods.map(m => m.color)
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  ShowSection(4)
}


function goBack(){
    ShowSection(1)
    emojiPicked2.innerHTML = ""
    feelingInput.value = "";
}

window.onload = function() {
  renderMoods(true); 
  ShowSection(1); 
};


/**
 * do sections mover in smart way ✅
 * pick single feeling and hold it ✅
 * move to next page if it click to emoje ✅
 * show emojie in section2 with texteara ✅
 * make condtions ✅
 * make progress draw 
 * make date and time ✅
 * localstorge 
 */
// well done ❤️