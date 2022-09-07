const input = document.querySelector('input');

const defaultText = document.getElementById('default');
const defaultCounter = document.getElementById('default-counter');
const debounceText = document.getElementById('debounce')
const debounceCounter = document.getElementById('debounce-counter')
const throttleText = document.getElementById('throttle')
const throttleCounter = document.getElementById('throttle-counter')

const updateDebounceText = debounce(text => {
    debounceText.textContent = text;
});
const updateDebounceCounter = debounce(() => {
    incrementCount(debounceCounter);
});

const updateThrottleText = throttle(text => {
    throttleText.textContent = text;
});
const updateThrottleCounter = throttle(() => {
    incrementCount(throttleCounter);
}, 100);

input.addEventListener('input', e => {
    defaultText.textContent = e.target.value;
    updateDebounceText(e.target.value);
    updateThrottleText(e.target.value);
});

function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}

function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay)
    }
}

document.addEventListener('mousemove', e => {
    incrementCount(defaultCounter);
    updateDebounceCounter();
    updateThrottleCounter()
});

function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0) + 1;
}