console.log("JavaScript está funcionando!");
document.addEventListener('DOMContentLoaded', () => {
    function checkLetter(index) {
        console.log(`checkLetter chamada com index: ${index}`);
        const palavra = document.querySelector('input[name="palavra"]').value;
        const letterField = document.getElementById(`letter-${index}`);
        const letter = letterField.value;

        if (letter === palavra[index]) {
            letterField.classList.add('correct');
            letterField.classList.remove('incorrect');
        } else if (palavra.includes(letter)) {
            letterField.classList.add('incorrect');
            letterField.classList.remove('correct');
        } else {
            letterField.classList.remove('correct', 'incorrect');
        }
    }

    function moveToNext(event) {
        console.log('moveToNext chamada');
        const input = event.target;
        if (input.value.length >= input.maxLength) {
            const nextInput = input.nextElementSibling;
            if (nextInput && nextInput.tagName === 'INPUT') {
                nextInput.focus();
            }
        }
    }

    function moveToPrevious(event) {
        console.log('moveToPrevious chamada');
        const input = event.target;
        if (event.key === 'Backspace' && input.value === '') {
            const prevInput = input.previousElementSibling;
            if (prevInput && prevInput.tagName === 'INPUT') {
                prevInput.focus();
            }
        }
    }

    document.querySelectorAll('input[name="tentativa"]').forEach(input => {
        console.log('Adicionando listeners');
        input.addEventListener('input', moveToNext);
        input.addEventListener('keydown', moveToPrevious);
    });
});
