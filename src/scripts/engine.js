const states = {
    views: {
        timeLeft: document.querySelector('.tempo'),
        score: document.querySelector('.score'),
        lifes: document.querySelector('.vidas'),
        squares: document.querySelectorAll('.quadrado'),
    },
    values: {
        hitPos: 0,
        score: 0,
        timeLeft: 30,
        lifes: 4,
        clicked: false,
    },
    actions: {
        loopRalph: setInterval(spawnRandomRalph, 500),
        timer: setInterval(countDown, 1000)
    }
}

// const reactiveStates = new Proxy(states, {

//     get: (states, key) => {
//         console.log(key)
//         return states[key]
//     },
//     set: (states, key, value) => {
//         console.log(key, value)
//         states[key] = value
//     }   

// } )



function spawnRandomRalph() {
    if(states.values.clicked == false){
        states.values.lifes--
    }
    
    states.views.squares.forEach(square => {
        square.classList.remove('ralph')
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = states.views.squares[randomNumber]
    randomSquare.classList.add('ralph')
    states.values.hitPos = randomSquare.id

    states.values.clicked = false
    
    function drawLifes(){
        states.views.lifes.querySelector('h2').textContent = states.values.lifes
        if(states.values.lifes < 0){
            alert('Game Over! o Ralph te comeu na porrada!')
            states.values.lifes = 4
        }

    }

    drawLifes()

}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.1
    audio.play()
}

function countDown() {

    states.values.timeLeft--
    states.views.timeLeft.querySelector('h3').textContent = states.values.timeLeft

    if (states.values.timeLeft < 0) {
        states.values.timeLeft = 30
        alert(`Game Over! sua pontuação foi: ${states.values.score} porradas no Ralph!`)
        states.values.score = 0
    }


}

function clickButtonListener() {

    states.views.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === states.values.hitPos) {
                states.values.clicked = true
                states.values.score++
                states.views.score.querySelector('h3').textContent = states.values.score
                states.values.hitPos = null
                playSound('hit')
            }
        })
    })


}

function start() {

    spawnRandomRalph()
    clickButtonListener()

}

start()