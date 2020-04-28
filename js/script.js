window.addEventListener('DOMContentLoaded', () =>{
       'use strict';

       let tab = document.querySelectorAll('.info-header-tab'),
           info = document.querySelector('.info-header'),
           tabContent = document.querySelectorAll('.info-tabcontent');
        
        function hideTabContent(a){
            for (let i = a; i < tabContent.length;i++){
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        hideTabContent(1);


        function showTabContent (b){

            if ( tabContent[b].classList.contains('hide')){
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }

        }

        info.addEventListener('click' ,  (event) => {
            let target = event.target;
            if ( target && target.classList.contains('info-header-tab')){
                for ( let i = 0 ;  i < tab.length ; i++){
                    if(target == tab[i]){
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });

        //timer

        let deadline = '2018-10-21';
        function getTimeRemaining (endtime){
            let t = Date.parse(endtime) - Date.parse(new Date()), //new date() врея сейчас
                seconds = Math.floor((t / 1000) % 60), // целые минуты и остаок
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor(t / (1000 * 60 * 60));

            console.log('done');
            return {
                'total': t,
                'hours': hours,
                'minutes ': minutes,
                'seconds': seconds
            };
        }

        function setClock(id , endtime){
            let timer = document.getElementById(id);
            let hours = timer.querySelector('.hours');
            let minutes = timer.querySelector('.minutes');
            let seconds = timer.querySelector('.seconds');
            console.log('hello');

            let timeInt = setInterval(updateClock,1000);
            function updateClock () {
                let t = getTimeRemaining(endtime);
               
                function addZero(num){
                    if(num <= 9) {
                        return '0' + num;
                    } else {return num;}
                }

                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);

                if ( t.total <= 0 ){
                    clearInterval(timeInt);
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';
                }
            }

        }

        setClock("timer", deadline);


        // modal window 

        let more = document.querySelector('.more'),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close');

        more.addEventListener('click' , function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; 
        });

        close.addEventListener('click' , function(){
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        //form
        //отправка в обычном формате 

        let message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Мы обязательно с вами свяжемся',
            failure: 'Что-то пошло не так'
        };

        let form = document.querySelector('.main-form'),
            input = document.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        
        statusMessage.classList.add('status');
        form.addEventListener('submit' , function(event){
            event.preventDefault();
            form.appendChild(statusMessage);
            let formData = new FormData(form);

            function postData(data){
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //данные получены из формы и идут на серв
                    //отправка в json формате
                    //request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    request.addEventListener('readystatechange', function (){
                        if (request.readyState < 4 ){
                    
                            resolve();
                        } else if ( request.readyState === 4 && request.status == 200){
                            statusMessage.innerHTML = message.success;
                            resolve();
                        } else { reject();}
                    });
                    /*
                                let obj = {};
                                formData.forEach( function(value,key){
                                    obj[key] = value;
                                }); // форм дата в объеут читаемый

                                let json = JSON.stringify(obj);

                    */
                   //request.send(json);
                    request.send(formData);
                });};


            postData(formData)
                              .then( ()=> statusMessage.innerHTML = message.loading)
                              .then( ()=> statusMessage.innerHTML = message.success)
                              .catch( ()=> statusMessage.innerHTML = message.failure);

 
        
    
            for( let i = 0 ; i < input.length; i++){
                input[i].value = '';
            }
        });

        //contact form

        let contactForm = document.getElementById('contacts');
        console.log(contactForm);
        
        contactForm.addEventListener('submit' , function(event){
            event.preventDefault();
            console.log('done');
            contactForm.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST','server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //данные получены из формы и идут на серв
            
            let formData  = new FormData(contactForm);
            request.send(formData);
            request.addEventListener('readystatechange', function (){
                if (request.readyState < 4 ){
                    statusMessage.innerHTML = message.loading;
                } else if ( request.readyState === 4 && request.status == 200){
                    statusMessage.innerHTML = message.success;
                } else { statusMessage.innerHTML = message.failure;}
            });

            for( let i = 0 ; i < input.length; i++){
                input[i].value = '';
            }
        });
});