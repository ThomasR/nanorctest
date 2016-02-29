let select = document.querySelector('#examples');
examples.forEach(example => {
    let option = document.createElement('option');
    option.value = example.title;
    option.textContent = example.title;
    select.appendChild(option);
});
select.addEventListener('change', e => {
    examples.forEach(example => {
        if (example.title === select.value) {
            nanorcEl.value = example.nanorc;
            codeEl.value = example.code;
        }
    })
});
