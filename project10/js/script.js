document.addEventListener('DOMContentLoaded', function () {

    let board = document.querySelector('#board');
    let button = document.querySelector('#button');

    //массив объектов
    let notesArr = JSON.parse(localStorage.getItem('notesArr')) || [];
    updateMarkup();

    function updateMarkup() {
        board.innerHTML = '';
        notesArr.forEach(function (item, index) {
            board.append(creatOneNoteMarkup(item, index));
        });
        localStorage.setItem('notesArr', JSON.stringify(notesArr));
        console.log(localStorage.getItem('notesArr'));
    }
    function creatOneNoteMarkup(object, index) {
        let tempDiv = document.createElement('div');
        tempDiv.className = 'note';
        tempDiv.style.top = object.y + 'px';
        tempDiv.style.left = object.x + 'px';
        let deltaX;
        let deltaY;


        let text = document.createElement('textarea');
        text.className = 'text';
        let i = document.createElement('i');
        // i.className = 'far fa-save', 'icon';
        i.className = "fas fa-download icon";
        

        let deleteBtn = document.createElement('span');
        deleteBtn.textContent = ' X';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = function () {
            notesArr.splice(index, 1);
            updateMarkup();
        }
        tempDiv.append(deleteBtn);
        tempDiv.append(text);
        tempDiv.append(i);


        tempDiv.onmousedown = function (e) {
            window.addEventListener('mousemove', setNotePosition);
            deltaX = e.clientX - tempDiv.offsetLeft;
            deltaY = e.clientY - tempDiv.offsetTop;
        }
        tempDiv.onmouseup = function (e) {
            window.removeEventListener('mousemove', setNotePosition);
            object.x = e.clientX - deltaX;
            object.y = e.clientY - deltaY;
            localStorage.setItem('notesArr', JSON.stringify(notesArr));
        }

        function setNotePosition(e) {
            tempDiv.style.top = (e.clientY - deltaY) + 'px';
            tempDiv.style.left = (e.clientX - deltaX) + 'px';
        }

        i.onclick = function (e) {
            object.text = text.value;
            localStorage.setItem('notesArr', JSON.stringify(notesArr));
        }
        text.textContent = object.text;

        return tempDiv;
    }




    function Note(x = 20, y = 20, text = 'hello...') {
        this.x = x;
        this.y = y;
        this.text = text;
    }

    button.onclick = function () {
        let newNote = new Note();
        notesArr.push(newNote);
        updateMarkup();
    }







})