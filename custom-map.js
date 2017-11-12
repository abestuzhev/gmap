ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom'],
            controls: ['zoomControl', 'fullscreenControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        /**
         * Создадим кластеризатор, вызвав функцию-конструктор.
         * Список всех опций доступен в документации.

         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
         */

         clusterIcons = [
         {
             href: 'm1.png',
             size: [40, 40],
             // Отступ, чтобы центр картинки совпадал с центром кластера.
             offset: [-20, -20]
         },
         {
             href: 'm1.png',
             size: [40, 40],
             offset: [-20, -20]
         }],

         MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
 '<div style="color: #FFFFFF; font-weight: bold;">$[properties.geoObjects.length]</div>'),

             clusterer = new ymaps.Clusterer({
            /**
             * Через кластеризатор можно указать только стили кластеров,
             * стили для меток нужно назначать каждой метке отдельно.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
             */
            // preset: 'islands#invertedVioletClusterIcons',
            clusterIcons: clusterIcons,
            clusterIconContentLayout: MyIconContentLayout,
            /**
             * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
             */
            groupByCoordinates: false,
            /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        }),
        /**
         * Функция возвращает объект, содержащий данные метки.
         * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
         * Поле balloonContentBody - источник данных для контента балуна.
         * Оба поля поддерживают HTML-разметку.
         * Список полей данных, которые используют стандартные макеты содержимого иконки метки
         * и балуна геообъектов, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */


        //     getPointData = function (index) {
        //     return {
        //         balloonContentHeader: '',
        //         balloonContentBody: '<div class="c-card-cafe c-card-map">'+
        //         '<div class="c-card-map__header">'+
        //             '<span class="popup-close" id="close-balloon" onclick="myMap.balloon.close()"></span>'+
        //             '<a href="#" class="c-card-map__title">$[properties.name]</a>'+
        //         '</div>'+
        //         '<div class="c-card-map__body">'+
        //             '<div class="c-card-cafe__img">'+
        //             '<img src="img/cafe-foto.jpg" alt="">'+
        //             '<a  href="#" class="c-card-cafe__menu">'+'<i class="icon-food-menu"></i>'+'меню</a>'+
        //         '</div>'+
        //         '<div class="c-card-cafe__body">'+
        //             '<div class="c-card-cafe__item">' + '<b>Адрес: </b>' + '$[properties.address]</div>'+
        //             '<div class="c-card-cafe__item">'+'<b>Телефон: </b>'+'$[properties.phoneNumber]</div>'+
        //             '<div class="c-card-cafe__item">'+'<b>Время работы: </b>'+'$[properties.timeWork]</div>'+
        //             '<div class="c-card-cafe__item c-card-cafe__subway">'+
        //                 '$[properties.subway]'+
        //             '</div>'+
        //             '<div class="c-card-cafe__item c-card-cafe__entertainment">$[properties.entertainment]</div>'+
        //             '<ul class="c-card-cafe-advantages">'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-coffe"></i></li>'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-guests"></i>150</li>'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-teddy"></i></li>'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-nipple"></i></li>'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-balloon"></i></li>'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-umbrella"></i></li>'+
        //                 '<li class="c-card-cafe-advantages__item"><i class="advantages-bottle"></i></li>'+
        //             '</ul>'+
        //             '</div>'+
        //         '</div>'+
        //     '</div>',
        //         balloonContentFooter: ''
        //     };
        // },

        /*шаблон попапа*/
        myBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="c-card-cafe c-card-map">'+
            '<div class="c-card-map__header">'+
            '<span class="popup-close" id="close-balloon" onclick="myMap.balloon.close()"></span>'+
            '<a href="#" class="c-card-map__title">$[properties.name]</a>'+
            '</div>'+
            '<div class="c-card-map__body">'+
            '<div class="c-card-cafe__img">'+
            '<img src="img/cafe-foto.jpg" alt="">'+
            '<a  href="#" class="c-card-cafe__menu">'+'<i class="icon-food-menu"></i>'+'меню</a>'+
            '</div>'+
            '<div class="c-card-cafe__body">'+
            '<div class="c-card-cafe__item">' + '<b>Адрес: </b>' + '$[properties.address]</div>'+
            '<div class="c-card-cafe__item">'+'<b>Телефон: </b>'+'$[properties.phoneNumber]</div>'+
            '<div class="c-card-cafe__item">'+'<b>Время работы: </b>'+'$[properties.timeWork]</div>'+
            '<div class="c-card-cafe__item c-card-cafe__subway">'+
            '$[properties.subway]'+
            '</div>'+
            '<div class="c-card-cafe__item c-card-cafe__entertainment">$[properties.entertainment]</div>'+
            '<ul class="c-card-cafe-advantages">'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-coffe"></i></li>'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-guests"></i>150</li>'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-teddy"></i></li>'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-nipple"></i></li>'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-balloon"></i></li>'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-umbrella"></i></li>'+
            '<li class="c-card-cafe-advantages__item"><i class="advantages-bottle"></i></li>'+
            '</ul>'+
            '</div>'+
            '</div>'+
            '</div>'
        ),
        /**
         * Функция возвращает объект, содержащий опции метки.
         * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
         getPointOptions = function () {
         return {
             iconImageHref: 'img/icons/icon-map-point.png',
             // Размеры изображения иконки
             iconImageSize: [44, 53],
             // смещение картинки
             iconImageOffset: [-22, -56],
             // Размеры содержимого балуна
             balloonContentSize: [660, 265],
             // Задаем макет балуна - пользовательская картинка с контентом
             balloonLayout: "default#imageWithContent",
             // Смещение картинки балуна
             balloonImageOffset: [-117, -300],
             // Размеры картинки балуна
             balloonImageSize: [660, 265],
             // Балун не имеет тени
             balloonShadow: false,
             //Выравнивание по умолчанию
             balloonAutoPan: false
         };
     },

        placemarks = [
           new ymaps.Placemark([55.74352990795752,37.56841313754272], {
               name: 'АндерСон для Пап',
               address: 'Московский, ул. Хабарова, дом 2, ТРЦ Новомосковский, вход со стороны пруда',
               phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
               timeWork: 'пн-вс с 09:00 до 23:00',
               entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
               subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
           }, {
               balloonContentLayout: myBalloonLayout
           },getPointOptions()),
           new ymaps.Placemark([55.8,37.9], {
               name: 'АндерСон для Пап',
               address: 'Московский, ул. Хабарова, дом 2, ТРЦ Новомосковский, вход со стороны пруда',
               phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
               timeWork: 'пн-вс с 09:00 до 23:00',
               entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
               subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
           }, {
               balloonContentLayout: myBalloonLayout
           },getPointOptions()),
           new ymaps.Placemark([59,31], {
               name: 'АндерСон для Пап2',
               address: 'Московский, ул. Хабарова, дом 2, ТРЦ Новомосковский, вход со стороны пруда',
               phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
               timeWork: 'пн-вс с 09:00 до 23:00',
               entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
               subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
           }, {
               balloonContentLayout: myBalloonLayout
           },getPointOptions()),
           new ymaps.Placemark([57,34], {
               name: 'на Класносельской',
               address: 'Московский, ул. Хабарова, дом 2',
               phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
               timeWork: 'пн-вс с 09:00 до 23:00',
               entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
               subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
           }, {
               balloonContentLayout: myBalloonLayout
           },getPointOptions()),
           new ymaps.Placemark([60,40], {
               name: 'Тестовое кафе ',
               address: 'Московский, ул. Хабарова, дом 2б Московский, ул. Хабарова, дом 2',
               phoneNumber: '+7 (495) 125-49-07, +7 (495) 125-49-07',
               timeWork: 'пн-вс с 09:00 до 23:00',
               entertainment: 'Зоопарк, Ледовая Арена, Цирк, Театр кукол, Гулливер, Игровая площадка',
               subway: '<img src="img/icons/icon-metro-1.png" alt="">Молодежная'
           }, {
               balloonContentLayout: myBalloonLayout
           },getPointOptions())
       ];

       // Создаем коллекцию, в которую будем добавлять метки
        // myCollection = new ymaps.GeoObjectCollection();

        //дбавляем все метки в коллекцию геообъектов
        // for(var i = 0, len = placemarks.length; i < len; i++) {
        //     myCollection.add(placemarks[i]);
        // }

    /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
    // for(var i = 0, len = placemarks.length; i < len; i++) {
    //     geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
    // }

    /**
     * Можно менять опции кластеризатора после создания.
     */
    clusterer.options.set({
        gridSize: 80,
        clusterDisableClickZoom: false
    });

    /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
    clusterer.add(placemarks);
    myMap.geoObjects.add(clusterer);

    /**
     * Спозиционируем карту так, чтобы на ней были видны все объекты.
     */

    myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
    });
});
