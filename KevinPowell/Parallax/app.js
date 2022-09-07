document.addEventListener('scroll', e => {
    console.log('scrollTop', document.body.scrollTop);
    console.log('scrollTop', document.body.scrollHeight);
    document.body.style.backgroundPositionY = `-${document.body.scrollTop*0.25}px`
})