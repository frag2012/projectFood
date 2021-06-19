"use strict";
window.addEventListener('DOMContentLoaded', () => {

   // Tabs

   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }
   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }
   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   // Timer

   const deadline = ('2021-06-28');

   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor((t / (1000 * 60 * 60) % 24)),
         minutes = Math.floor((t / 1000 / 60) % 60),
         seconds = Math.floor((t / 1000) % 60);

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = document.querySelector('#days'),
         hours = document.querySelector('#hours'),
         minutes = document.querySelector('#minutes'),
         seconds = document.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.textContent = getZero(t.days);
         hours.textContent = getZero(t.hours);
         minutes.textContent = getZero(t.minutes);
         seconds.textContent = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }
   setClock('.timer', deadline);

   // Modal

   const modalTriger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = 'visible';
   }


   modalTriger.forEach((button) => {
      button.addEventListener('click', openModal);



      modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
         }
      });

      document.addEventListener('keydown', (e) => {
         if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
         }
      });

   });

   const modalTimerId = setTimeout(openModal, 50000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);

   // classes

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 74;
         this.changeToRUB();
      }
      changeToRUB() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }

         element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
         </div>
      `;
         this.parent.append(element);
      }
   }

   new MenuCard(
      'img/tabs/vegy.jpg',
      'vegy',
      'Меню "Фитнес"',
      "Меню &laquo;Фитнес&raquo;&nbsp;&mdash; это новый подход к&nbsp;приготовлению блюд: больше свежих овощей и&nbsp;фруктов.Продукт активных и&nbsp;здоровых людей.Это абсолютно новый продукт с&nbsp;оптимальной ценой и&nbsp;высоким качеством!",
      9,
      '.menu .container',
   ).render();

   new MenuCard(
      'img/tabs/elite.jpg',
      'elite',
      'Меню “Премиум”',
      'В&nbsp;меню &laquo;Премиум&raquo; мы&nbsp;используем не&nbsp;только красивый дизайн упаковки, но&nbsp;и&nbsp;качественное исполнение блюд.Красная рыба, морепродукты, фрукты&nbsp;&mdash; ресторанное меню без похода в&nbsp;ресторан!',
      15,
      '.menu .container',

   ).render();

   new MenuCard(
      'img/tabs/post.jpg',
      'post',
      'Меню "Постное"',
      'Меню &laquo;Постное&raquo;&nbsp;&mdash; это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из&nbsp;миндаля, овса, кокоса или гречки, правильное количество белков за&nbsp;счет тофу и&nbsp;импортных вегетарианских стейков.',
      11,
      '.menu .container',

   ).render();

   // Forms
   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Мы скоро с вами свяжемся.',
      failure: 'Что-то пошло не так...'

   };

   forms.forEach(item => {
      postData(item);
   });

   function postData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
         `;
         form.insertAdjacentElement('afterEnd', statusMessage);


         const request = new XMLHttpRequest();
         request.open('POST', 'server.php');
         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
         const formData = new FormData(form);

         const object = {};
         formData.forEach(function (value, key) {
            object[key] = value;
         });

         const json = JSON.stringify(object);

         request.send(json);

         request.addEventListener('load', () => {
            if (request.status === 200) {
               console.log(request.response);
               showThanksModal(message.success);
               form.reset();
               statusMessage.remove();
            } else {
               showThanksModal(message.failure);
            }
         });
      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class ='modal__content'>
            <div class ='modal__close' data-close>&times;</div>
            <div class ='modal__title'>${message}</div>
         </div>     
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }

});



