// dom ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('dom ready')
    
    let progressSlider = document.querySelector('.slider')
    let time = document.getElementById('time')
    let progress = document.getElementById('progress')
    // event listener for the slider
    progressSlider.addEventListener('input', function (event) {
        mainTimeline.progress(this.value).pause()
    })

    tweenFunc()
})
// window resize
window.addEventListener('resize', function () {
    console.log('window resized')
})

const mainTimeline = new TimelineLite({
    onUpdate: updateSlider
})

const tweenFunc = function () {
    // main timeline
    // splittext title object
    let headerText = new SplitText('.title.is-3', {
        type: 'chars, lines'
    })
    // lines
    let headerLines = headerText.lines
    // chars
    let headerChars = headerText.chars

    let endText = new SplitText('.title.is-4', {
        type: 'chars, lines'
    })
    let endLines = endText.lines
    let endChars = endText.chars

    let storyText = new SplitText('.story p', {
        type: 'words, lines'
    })
    let storyLines = storyText.lines
    let storyWords = storyText.words

    // iterate through each char in that collection, tween from
    mainTimeline.staggerFrom(
        headerChars,
        1,
        {
            opacity: 0,
            x: -100,
            rotationX: 180,
            rotationY: 360,
            scale: 4,
            ease: Linear.easeOut
        },
        0.1
    )
    mainTimeline.staggerFrom(
        storyWords,
        .25, {
            opacity: 0,
            y: -40,
            scale: 4,
            color: '#ffa500',
            ease: Back.easeInOut
        },
        0.05
    )
    mainTimeline.staggerFrom(
        endLines,
        1, {
            opacity: 0,
            y: -100,
            ease: Bounce.easeOut,
            onComplete: storyEnd,
            onCompleteParams: [endChars, storyWords, headerChars]
        },
        0.1
    )
}

const explodeText = function (chars, duration, delay) {
    let tl = new TimelineLite()

    chars.forEach(function (el, i) {
        let newX = Math.floor(Math.random() * window.innerWidth)
        newX += Math.floor(Math.random() * 2) == 1 ? 1 : -1

        let newY = Math.floor(Math.random() * window.innerHeight)
        newY += Math.floor(Math.random() * 2) == 1 ? 1 : -1

        tl.to(
            el,
            duration,
            {
                x: newX,
                y: newY,
                scale: 10,
                opacity: 0,
                rotation: 360,
                rotationX: 540,
                rotationY: 180
            },
            i * delay
        )
    })
    return tl
}

const storyEnd = function (endChars, storyWords, headerChars) {
    mainTimeline.add(explodeText(endChars, 0.75, 0.1))
    mainTimeline.add(explodeText(storyWords, 0.75, 0.03))
    mainTimeline.add(explodeText(headerChars, 0.75, 0.1))
}

function updateSlider() {
    let progressSlider = document.querySelector('.slider')
    let time = document.getElementById('time')
    let progress = document.getElementById('progress')
    progressSlider.value = mainTimeline.progress()
    time.innerHTML = mainTimeline.time().toFixed(2)
    progress.innerHTML = mainTimeline.progress().toFixed(2)
}