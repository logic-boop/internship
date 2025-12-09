/* projects.js — simple Counter app JS
   Beginner-friendly: increment, decrement, reset, and prevents negative values
*/

document.addEventListener('DOMContentLoaded', () => {
    const valueEl = document.getElementById('counter-value');
    const incBtn = document.getElementById('increment');
    const decBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('reset');

    let count = 0;

    function render() {
        valueEl.textContent = count;
    }

    incBtn.addEventListener('click', () => {
        count += 1;
        render();
    });

    decBtn.addEventListener('click', () => {
        if (count === 0) return; // prevent negative
        count -= 1;
        render();
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        render();
    });

    render();
});
