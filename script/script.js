const loadLesson = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const displayLessons = (lessons) =>{
    const LessonsDiv = document.getElementById('Lessons-div')
    LessonsDiv.innerHTML = '';

    lessons.forEach(lesson =>{
        const lessonBtn = document.createElement('div')

        lessonBtn.innerHTML = `
            <button id="active-btn-${lesson.level_no}" onclick="getCard(${lesson.level_no})" class=" flex btn btn-soft btn-primary ">
            <img src="./assets/fa-book-open.png" alt="" />Lesson - ${lesson.level_no}
            </button>
        `

        LessonsDiv.appendChild(lessonBtn)
    })
}

loadLesson()

// card functionality 
const getCard = (id) =>{

  lodingFun(false)

    const url =`https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(url)
    .then(res => res.json())
    .then(object => {

        const activeBtn = document.querySelectorAll('.active-btn')

        for(let btn of activeBtn){
            btn.classList.remove('active-btn')

        }
        document.getElementById(`active-btn-${id}`).classList.add('active-btn')

        displayCard(object.data)

    })
    
}


const displayCard = (array) =>{
    const cardsParent = document.getElementById('cards-parent')
    cardsParent.innerHTML = '';

    if(array.length == 0){
        cardsParent.innerHTML = `
          <div class="col-span-full text-center space-y-4 ">
          <img class="m-auto" src="./assets/alert-error.png" alt="">
          <p class="text-gray-400 font-bangla">আপনি এখনো কোন Lesson Select করেন নি</p>
          <p class="text-4xl font-semibold font-bangla">একটি Lesson Select করুন।</p>
        </div>
        `;
    }

    array.forEach(object => {
        const div = document.createElement('div')
        

        div.innerHTML= `
          <div class="card bg-white py-10 text-center space-y-4">

          <h2 class="font-bold text-2xl">${object.word ? object.word:'শব্দ পাওয়া যায় নি'}</h2>
          <p class="font-semibold">Meaning/Pronounciation</p>
          <p class="font-bangla text-xl font-medium">${object.meaning?object.meaning :'অর্থ পাওয়া যায় নি'}/${object.pronunciation}</p>

          <div class="flex justify-between w-10/12 mx-auto">
            <button id="" onclick="loadWordDetails(${object.id})" class="bg-[#1A91FF1A] p-3 rounded-lg hover:bg-[#422AD2] hover:text-white"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="my_modal_5.showModal()" class="bg-[#1A91FF1A] p-3 rounded-lg hover:bg-[#422AD2] hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
            
        `

        cardsParent.appendChild(div)
    })

    lodingFun(true);
}


const loadWordDetails = async (id) =>{
    const url =  `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.data)
    


}

const displayDetails = (word) =>{
    const detailsContainer = document.getElementById('details_container')

    const div = document.createElement('div')

    
    detailsContainer.innerHTML = `

    
      <div>
       <h1 class="font-bold text-2xl ">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
        <div>
          <h2 class="font-semibold mt-2">Meaning</h2>
          <p class="font-bangla">${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-semibold mt-2">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2 class="font-semibold font-bangla mt-2">সমার্থক শব্দ গুলো</h2>
          <div id="synonyms" class="space-x-2">
            
          </div>
        </div>
      </div>
    `
    createElementForDetails(word.synonyms)
    document.getElementById('my_modal_5').showModal()
}

// const createElementForDetails = (array) =>{
//     const createElement = array.map(el =>`<span class="btn">${el }</span>` )
//     return createElement.join(' ');
  
// }

const createElementForDetails = (array) =>{
  const synonyms = document.getElementById('synonyms')
  
  for(let val of array){
    const span = document.createElement('span')
    span.classList.add('btn','mt-3')
    span.innerText = val;
    synonyms.appendChild(span)
  }
}


const lodingFun = (value) =>{
  if(value == false){
    document.getElementById('loding').classList.remove('hidden')
    document.getElementById('cards-parent').classList.add('hidden')
  }else{
    document.getElementById('cards-parent').classList.remove('hidden')
    document.getElementById('loding').classList.add('hidden');

 }
}