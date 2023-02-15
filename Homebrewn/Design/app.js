function applyModelBinding(model, ...elements) {
    console.log(elements);
    for(let elem of elements) {
        const bindings = [...elem.querySelectorAll(`[data-binding]`)];

        console.log(bindings);
        for (let binding of bindings) {
            const value = binding.dataset['binding'] in model ? model[binding.dataset['binding']] : '';
            console.log(`setting ${binding.dataset['binding']} to '${value}'`);
            binding.value = value;
        }
    }
}

applyModelBinding({username: 'Jesper'}, document.body);