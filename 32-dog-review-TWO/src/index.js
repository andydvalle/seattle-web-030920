// {
//     "id": 1,
//     "likes": 4,
//     "name": "Norma",
//     "breed": "Italian Greyhound",
//     "image": "https://3.bp.blogspot.com/-uCd3eT8_AgA/XCZ-qnZIbXI/AAAAAAAATgQ/G8t6mwyZeIwb9OtUd2tEuasstpXsJgWlQCLcBGAs/s1600/IMG_3613l.JPG",
//     "comments": [
//       "God's perfect idiot",
//       "Everyone loves her",
//       "I'm literally going to steal this dog"
//     ]
//   }

// structure for doggos

{/* <div id='1'>
            <h2>Norma</h2>
            <p>Italian Greyhound</p>
            <img src='https://3.bp.blogspot.com/-uCd3eT8_AgA/XCZ-qnZIbXI/AAAAAAAATgQ/G8t6mwyZeIwb9OtUd2tEuasstpXsJgWlQCLcBGAs/s1600/IMG_3613l.JPG'></img>
            <p>Likes: 15</p>
            <p>Comments:</p>
            <ul>
                <li>God's perfect idiot</li>
                <li>Everyone loves her</li>
                <li>I'm literally going to steal this dog</li>
            </ul>
            <form>
                <label>Add Comment:</label>
                <input placeholder='text here' type='text' name='comment'></input>
                <input type='submit'></input>
            </form>
        </div> */}

const DOGSURL = "http://localhost:3000/dogs"
const main = document.querySelector('main')

function fetchDogs(){
    fetch(DOGSURL)
    .then(results=> results.json())
    .then(results=>{
        results.forEach(dog=>buildDogCard(dog))
    })
}

function buildDogCard(dog){
    // what if we just check if this already exists
    // let newDiv = document.getElementById(dog.id)
    // if(newDiv){

    // }

    let newDiv = document.createElement('div')
    newDiv.id = dog.id
    newDiv.innerHTML = 
    `<h2>${dog.name}</h2>
    <p>${dog.breed}</p>
    <img src='${dog.image}'></img>
    <p>Likes: ${dog.likes}</p>
    <p>Comments:</p>`
    let ul = document.createElement('ul')
    newDiv.appendChild(ul)

    dog.comments.forEach(comment=>{
        let li = document.createElement('li')
        li.innerText = comment
        ul.appendChild(li)
    })

    let form = document.createElement('form')
    form.innerHTML = 
        `<label>Add Comment:</label>
        <input placeholder='text here' type='text' name='comment'></input>
        <input type='submit'></input>
        `

    form.addEventListener('submit', ()=> handleSubmit(dog))
    newDiv.appendChild(form)

    main.append(newDiv)
}

function handleSubmit(dog){
    event.preventDefault()
    dog.comments.push(event.target.comment.value)
    // optimistic rendering
    let newLi = document.createElement('li')
    newLi.innerText = event.target.comment.value

    let dogDiv = document.getElementById(dog.id)
    dogDiv.querySelector(`ul`).appendChild(newLi)
    // then we send it to a fetch
    patchDog(dog)
}

function patchDog(dog){
    return fetch(`${DOGSURL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(res=> res.json())
    .then(dog=>{
        updateDomComments(dog)
        // no
    })
    .catch((error) => {
        console.error('Error:', error);
      })
}

// function updateDomComments(dog){
//     let dogDiv = document.getElementById(dog.id)
//     can get all dogs from this
//     dogDiv.querySelector(`ul`)
// }

fetchDogs()