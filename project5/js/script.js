document.addEventListener('DOMContentLoaded', function () {
    let ol = document.querySelector('ol');
    let li = document.querySelector('li');
    if (ol.className === 'carousel-indicators'){
        if (li.className === 'active' && li.className === 'my-li') {
        li.style.backgroundColor = 'red';
        
    } 
    console.log(li);
    }
    console.log(ol);
})