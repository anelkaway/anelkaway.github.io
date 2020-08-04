document.addEventListener('DOMContentLoaded', function () {

    window.addEventListener('scroll', function () {
        document.getElementById('topscrol').hidden = (pageYOffset < document.documentElement.clientHeight);;
    });

    //add/remove style
    let phoneKnop = document.querySelector(".big_phone_knop");
    let phoneKnop2 = document.querySelector(".big_phone_knop2");
    let phone = document.querySelector(".big_phone");
    let phoneText = document.querySelector(".big_phone_text");

    phoneKnop.onmouseover = addStyle;
    phoneKnop.onmouseout = removeStyle;

    function addStyle(e) {
        if (e.type === 'mouseover') {
            phoneKnop.classList.add("selected_big_phone");
            phone.classList.add("selected_big_phone");
            phoneText.classList.add("selected_big_phone");
        }
        else {
            phoneKnop.classList.remove("selected_big_phone")
        };
    }

    function removeStyle(e) {
        if (e.type === 'mouseout') {
            phoneKnop.classList.remove("selected_big_phone");
            phone.classList.remove("selected_big_phone");
            phoneText.classList.remove("selected_big_phone");
        };
    }


    //***** send message to mail
    let form = document.querySelector('form');
    let inputName = document.querySelector('input[name=name]');
    let inputTel = document.querySelector('input[name=tel]');
    form.onsubmit = function (e) {
        e.preventDefault();
        let userObject = {
            name: inputName.value,
            tel: inputTel.value
        }
        alert("Ваше сообщение отправлено!");
        console.log(userObject.name, userObject.tel);

        //*************** */
        var link = "mailto:elen.kozur@mail.ru"
            + "?cc=myCCaddress@mail.ru"
            + "&subject=" + escape("This is my subject")
            + "&body=" + escape(document.getElementById('name').value)
            ;

        window.location.href = link;
    }

    //slowly scroll to href
    const anchors = document.querySelectorAll('a.a_topmen_link')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            let blockID = anchor.getAttribute('href')

            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    let topank = document.querySelector('div.a_topmen_link');
    topank.onclick = function (e) {
        e.preventDefault();
        document.querySelector('#topank').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

})