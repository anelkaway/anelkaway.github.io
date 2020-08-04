'use strict';
document.addEventListener('DOMContentLoaded', function () {


  // block1
  let pname = document.querySelector('.pname');
  let ptime = document.querySelector('.ptime');
  let icon1 = document.querySelector('.icon1');
  //block2
  let h1 = document.querySelector('h1');
  let h3 = document.querySelector('h3');
  let img = document.querySelector('img');
  //block3
  let iwind = document.querySelector('.iwind');
  let ispeed = document.querySelector('.ispeed');
  let wind = document.querySelector('.wind');
  let speed = document.querySelector('.speed');

  // nextday
  let ul = document.querySelector('.nextday');
  
  
  let lat, lon, myMap;
  let map = document.querySelector('#map');

  const API_KEY = '8ce5c151de83e171243a81584cf16cfa';
  new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
    .then(result => {
      console.log(result);
      let lat = result.coords.latitude;
      let lon = result.coords.longitude;
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=` + API_KEY).then(response => response.json());
    },
      error => {
        alert(error.message);
      }
    )
    .then(result => {
      console.log(result);
      showWeather(result);
      let lat = result.coord.lat;
      let lon = result.coord.lon;
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=` + API_KEY).then(response => response.json());
    },
      error => {
        alert(error.message);
      }
    ).then(result => {
      let lat = result.city.coord.lat;
      let lon = result.city.coord.lon;
      console.log(result);
      updateMarkup(result.list);
      ymaps.ready(init(lat, lon)); 
    });


  function showWeather(weatherObj) {
    document.body.classList.remove('loading');

    let now = new Date();
    pname.textContent = `${weatherObj.name}, ${weatherObj.sys.country}`;
    // ptime.textContent = `${now.getHours()}:${now.getMinutes()} `; или так:
    let hour = now.getHours();
    let min = now.getMinutes();
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;
    ptime.textContent = `${hour}:${min} `;

    icon1.className = 'far fa-clock icon1';

    let icon = weatherObj.weather[0].icon;
    h1.textContent = `${Math.round(weatherObj.main.temp)} ‎\u00B0C `;
    h3.textContent = `Feels like  ${Math.round(weatherObj.main.feels_like)} ‎\u00B0C`
    img.setAttribute('src', `http:/openweathermap.org/img/wn/${icon}@2x.png`);
    iwind.className = 'far fa-compass iwind';
    ispeed.className = 'fas fa-wind ispeed';
    switch (true) {
      case 0: wind.textContent = "North"; break;
      case (weatherObj.wind.deg > 0 && weatherObj.wind.deg < 90): wind.textContent = "North-East"; break;
      case 90: wind.textContent = "East"; break;
      case (weatherObj.wind.deg > 90 && weatherObj.wind.deg < 180): wind.textContent = "South-East"; break;
      case 180: wind.textContent = "South"; break;
      case (weatherObj.wind.deg > 180 && weatherObj.wind.deg < 270): wind.textContent = "South-West"; break;
      case 270: wind.textContent = "West"; break;
      case (weatherObj.wind.deg > 270 && weatherObj.wind.deg < 360): wind.textContent = "North-West"; break;
    }
    // wind.textContent = weatherObj.wind.deg;
    speed.textContent = weatherObj.wind.speed + ' m/s';
  }

  function updateMarkup(tempArr = weatherObj.list) {
    ul.innerHTML = '';
    for (let i = 0; i < tempArr.length; i += 8) {
      ul.append(createOneLiMarkup(tempArr[i], i));
    }
  }


  function createOneLiMarkup(tempObj, index) {
    let newLi = document.createElement('li');
    let pli = document.createElement('p');
    pli.className = 'templi';
    let p1li = document.createElement('p');
    p1li.className = 'textli'
    let liIcon = document.createElement('img');
    liIcon.className = 'iconli';

    let dt = new Date(tempObj.dt * 1000);
    let weatherIcon = tempObj.weather[0].icon;
    liIcon.setAttribute('src', `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
    let maintemp = Math.round(tempObj.main.temp - 273.15);
    let m = dt.toLocaleString('en', { month: 'short' });
    let h = dt.toLocaleString('en', { hour: '2-digit' });

    p1li.textContent = `${dt.getDate()} ${m} ${h.toLowerCase()} `;
    pli.textContent = `${maintemp} ‎\u00B0C`;

    newLi.append(p1li);
    newLi.append(liIcon);
    newLi.append(pli);

    return newLi;
  }



  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  // ymaps.ready(init);
  function init(lat,lon) {
    let x, y;
    map.style.height = document.documentElement.clientHeight + 'px';
    map.style.width = document.documentElement.clientWidth + 'px';
    // Создание карты.
    let myPlacemark, myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [lat, lon],
      // center:[26.83, 54.31],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 9,
    });
    myMap.events.add('click', function (e) {

      // Географические координаты точки клика можно узнать
      // посредством вызова метода .get('coords').
      // let myPlacemark;
      let coordinats = e.get('coords');
      x = coordinats[0];
      y = coordinats[1];
      getCoord(x, y);
      // есть ли метка
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coordinats);
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(coordinats);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coordinats);

      // Создание метки.
      function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
          iconCaption: 'поиск...'
        }, {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true
        });
      }

      function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);

          myPlacemark.properties
            .set({
              // Формируем строку с данными об объекте.
              iconCaption: [
                // Название населенного пункта или вышестоящее административно-территориальное образование.
                firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
              ].filter(Boolean).join(', '),
              // В качестве контента балуна задаем строку с адресом объекта.
              balloonContent: firstGeoObject.getAddressLine()
            });
        });
      }


    });

  }

  //НОВЫЕ КООРДИНАТЫ 
  function getCoord(newlat, newlon) {
    if (newlat != lat || newlon != lon) {
      alert('new coordinats!!!')
      lat = newlat;
      lon = newlon;
      new Promise(function (resolve, reject) {
        resolve(fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=` + API_KEY).then(response => response.json()));

      })
        .then(result => {
          console.log(result);
          showWeather(result);
          let lat = result.coord.lat;
          let lon = result.coord.lon;
          return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=` + API_KEY).then(response => response.json());
        },
          error => {
            alert(error.message);
          }
        )
        .then(result => {
          console.log(result);
          updateMarkup(result.list);
        });
    
    }
  }

  

});