const numbers = [20, 21, 22, 23, 24, 25, 26];

numbers.forEach(function (num) {
    console.log(num);
});

numbers.forEach(function (num, index) {
    console.log(index, num);
});

function printTriple(num) {
    console.log('triple', num * 3);
}

numbers.forEach(printTriple);