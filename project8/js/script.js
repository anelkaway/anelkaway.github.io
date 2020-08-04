document.addEventListener('DOMContentLoaded',function(){
    let form = document.querySelector('form');
    let inputName = document.querySelector('input[name=petname]');
    let inputOwner = document.querySelector('input[name=petowner]');
    let inputDate = document.querySelector('input[name=dateuser]');
    let inputTime = document.querySelector('input[name=timeuser]');
    let inputNotes = document.querySelector('textarea[name=notes]');
    let ul = document.querySelector('ul');
    let select = document.querySelector('select');
    let search = document.querySelector('input[name=search]');

    let Pet1 = {
        petname:'Buffy',
        petowner: 'Hassum Harrod',
        dateuser: '20.01.2020',
        timeuser: '14:30',
        notes: 'his Chihuahua has not eaten for three days and is lethargic'
    };
    let Pet2 = {
        petname:'Goldie',
        petowner: 'Barot Bellingham',
        dateuser: '18.01.2020',
        timeuser: '10:30',
        notes: 'he Goldfish has some weird spots in the belly'
    };
    let Pet3 = {
        petname:'Mitten',
        petowner: 'Hillary Goldwyn',
        dateuser: '20.12.2019',
        timeuser: '14:00',
        notes: 'Cat has excessive hairbals'
    };

    let userData = [Pet1,Pet2,Pet3];
    let filteredData = userData.slice();//клон
    
    function updateMarkup(tempArr = userData){
        ul.innerHTML = '';
        for(let i = 0; i < tempArr.length;i++){
            ul.append(createOneLiMarkup(tempArr[i],i));
        }
    }

    function createOneLiMarkup(userObj,index){
        let newLi = document.createElement('li');
        newLi.textContent = userObj.petname;
        newLi.style.fontWeight = '900';
        newLi.style.color = 'blue';
        newLi.style.listStyle = 'none';
        newLi.style.padding = '5px';
        
        let divTime = document.createElement('div');
        divTime.textContent = userObj.dateuser + ' ' + userObj.timeuser;
        divTime.style.color = 'black';
        divTime.style.margin = '5px';
        divTime.style.padding = '5px 0 5px 30px';
        
        newLi.append(divTime);
        let divOwner = document.createElement('div');
        divOwner.textContent = 'Owner:' + userObj.petowner;
        divOwner.style.fontWeight = 'normal';
        divTime.append(divOwner);
        let divNotes = document.createElement('div');
        divNotes.textContent = userObj.notes;
        divNotes.style.borderBottom = '1px solid gray'
        divOwner.append(divNotes);
        let deleteBtn = document.createElement('span');
        deleteBtn.style.background = 'red';
        deleteBtn.style.color = 'white';
        deleteBtn.style.padding = '5px';
        deleteBtn.style.margin = '5px';
        deleteBtn.style.textAlign = 'center';
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = function(){
            userData.splice(index,1);
            updateMarkup();
        }
        newLi.prepend(deleteBtn);
        return newLi;
    }

    updateMarkup();

    form.onsubmit = function(e){
        e.preventDefault();
        let userObject = {
            petname:inputName.value,
            petowner: inputOwner.value,
            dateuser: inputDate.value,
            timeuser: inputTime.value,
            notes: inputNotes.value
        }
        userData.push(userObject);
        updateMarkup();
        inputName.value = '';
        inputOwner.value = '';
        inputDate.value = '';
        inputTime.value = '';
        inputNotes.value = '';
    }

    select.onchange = function(e){
        let userSelect = select.value;
        filteredData.sort(function(a,b){
            if (a[userSelect].toLowerCase() > b[userSelect].toLowerCase()) return 1;
            return -1;
            
        });
        updateMarkup(filteredData);
    }

    search.onkeyup = function(e){
        let userSearchString = search.value.toLowerCase().trim();
            filteredData = userData.filter(function(item){
            let strFromObj = item.petname + item.petowner;
            strFromObj = strFromObj.toLowerCase();
            if (strFromObj.includes(userSearchString)) return true;
            return false;
        });
        updateMarkup(filteredData);
    }

    
});