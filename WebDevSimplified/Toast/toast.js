const DEFAULT_OPTIONS = {
    position: 'top-right',
    autoClose: 5000,
    canClose: true,
    showProgress: true,
    pauseOnHover: false,

    onClose: () => { }
}

export default class Toast {
    #toastElem;
    #autoCloseInterval;
    #removeBinded;;
    #timeVisible = 0;
    #autoClose;
    #progressInterval;

    #isPaused = false;
    #unpause;
    #pause;

    constructor(options) {
        this.#toastElem = document.createElement('div');
        this.#toastElem.classList.add('toast');
        requestAnimationFrame(() => {
            this.#toastElem.classList.add('show');
        });
        this.#removeBinded = this.remove.bind(this);
        this.#unpause = () => this.#isPaused = false;
        this.#pause = () => this.#isPaused = true;
        this.update({ ...DEFAULT_OPTIONS, ...options });
    }

    set autoClose(delay) {
        this.#autoClose = delay;
        this.#timeVisible = 0;
        if (delay === false) return;

        let lastTime;

        const func = time => {
            if (lastTime == null) {
                lastTime = time;
                this.#autoCloseInterval = requestAnimationFrame(func);
                return;
            }

            if (!this.#isPaused) {
                this.#timeVisible += time - lastTime;
                if (this.#timeVisible >= this.#autoClose) {
                    this.remove();
                    return;
                }
            }

            lastTime = time;
            this.#autoCloseInterval = requestAnimationFrame(func);
        };

        this.#autoCloseInterval = requestAnimationFrame(func);
    }
    set position(value) {
        const currentContainer = this.#toastElem.parentElement;
        const selector = `.toast-container[data-position= "${value}"]`
        const container = document.querySelector(selector) || createContainer(value);
        container.append(this.#toastElem);

        if (currentContainer == null || currentContainer.hasChildNodes()) return;
        currentContainer.remove();
    }

    set text(value) {
        this.#toastElem.textContent = value;
    }

    set canClose(value) {
        this.#toastElem.classList.toggle('can-close', value);
        if (value) {
            this.#toastElem.addEventListener('click', this.#removeBinded);
        }
        else {
            this.#toastElem.removeEventListener('click', this.#removeBinded);
        }
    }

    set showProgress(value) {
        this.#toastElem.classList.toggle('progress', value);
        this.#toastElem.style.setProperty('--progress', 1);
        if (value) {
            const func = (time) => {

                if (!this.#isPaused) {
                    this.#toastElem.style.setProperty('--progress', 1 - (this.#timeVisible / this.#autoClose));
                }

                this.#progressInterval = requestAnimationFrame(func);
            }
            this.#progressInterval = requestAnimationFrame(func);
        }
    }

    set pauseOnHover(value) {
        this.#toastElem.classList.toggle('can-close', value);
        if (value) {
            this.#toastElem.addEventListener('mouseover', this.#pause);
            this.#toastElem.addEventListener('mouseleave', this.#unpause);
        }
        else {
            this.#toastElem.removeEventListener('mouseover', this.#pause);
            this.#toastElem.removeEventListener('mouseleave', this.#unpause);
        }
    }

    update(options) {
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    remove() {
        const container = this.#toastElem.parentElement;
        this.#toastElem.classList.remove('show');
        this.#toastElem.addEventListener('transitionend', () => {
            this.#toastElem.remove();
        });
        clearTimeout(this.#autoCloseInterval);
        cancelAnimationFrame(this.#progressInterval);

        this.onClose();
        if (container.hasChildNodes()) return;
        container.remove();
    }
}

function createContainer(position) {
    const container = document.createElement('div');
    container.classList.add('toast-container');
    container.dataset.position = position;
    document.body.append(container);
    return container;
}