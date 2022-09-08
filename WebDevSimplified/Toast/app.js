import Toast from "./toast.js";

let counter = 1;
document.querySelector('button').addEventListener('click', (e) => {
    const toast = new Toast({
        position: 'bottom-center',
        autoClose: 5000,
        text: `hello: ${counter++}`,
        pauseOnHover: true,
        pauseOnFocusLoss: true
    });
});