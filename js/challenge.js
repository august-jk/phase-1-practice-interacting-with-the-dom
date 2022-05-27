//declarations
const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const likeBtn = document.querySelector('#heart');
const pauseBtn = document.querySelector('#pause');
const form = document.querySelector('form');
const input = document.querySelector('input');
const commentBtn = document.querySelector('#submit');

//counter
const counter = document.querySelector('#counter')
let seconds = 0;
let isActive = true;
let timer;
const startTimer = () => {
    timer = setInterval(increaseCount, 1000)
}
const pauseOrResumeTimer = () => {
   
    if(isActive){
        clearInterval(timer);
        pauseBtn.textContent = 'resume';
    }
    else{
        startTimer();
        pauseBtn.textContent = 'pause';
    }
    toggleActive();
}
function toggleActive(notPauseBtn){
    const buttons = Array.from(document.querySelectorAll('button'));
    notPauseBtn = buttons.filter(button => button.id !== 'pause');

    notPauseBtn.forEach(button => button.disabled = isActive);
    isActive = !isActive;
}


//increase/decrease counter
const increaseCount = () => {
    const currentCount = parseInt(counter.textContent);
    counter.textContent = `${currentCount + 1}`
 }
 const decreaseCount = () => {
     const currentCount = parseInt(counter.textContent);
     if(currentCount > 0){
         counter.textContent = `${currentCount - 1}`;
     }
 }

//likes
const likes = document.querySelector('.likes');

const addLike = () => {
    const currentCount = parseInt(counter.textContent);
    const previousLikes = Array.from( likes.children );
    const previousLike = previousLikes.find(previousLike => {
        const previousLikeCountText = previousLike.textContent.split(' ')[0];
        const previousLikeCount = parseInt(previousLikeCountText);
        return previousLikeCount === currentCount;

    })
    if(previousLike){
        const previousLikesText = previousLike.textContent.split(' ').slice(-2)[0]
        const numberOfLikes = parseInt(previousLikesText);
        previousLike.textContent = `${currentCount} has been liked ${numberOfLikes + 1} times`
    } 
    else {
        const newLike = document.createElement('li');
        newLike.textContent = `${currentCount} has been liked 1 time`;
        likes.append(newLike);
    }   
}


//buttons
const onClick = (btn, fn) => {
    btn.addEventListener('click', fn)
}

//comments
const displayComment = (event) => {
    event.preventDefault()
    const commentFormData = new FormData(event.target);
    const commentText = commentFormData.get('comment');

   const comment = document.createElement('p');
   comment.textContent = commentText;
   document.querySelector('#list').appendChild(comment);
   event.target.reset();
}


document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', displayComment);
    startTimer()
    onClick(pauseBtn, pauseOrResumeTimer)
    onClick(plusBtn, increaseCount);
    onClick(minusBtn, decreaseCount);
    onClick(likeBtn, addLike);
})