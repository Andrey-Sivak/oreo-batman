'use strict';

import $ from 'jquery';
import './jquery.validate.min';

const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');
    if (loader.classList.contains('active')) {
        loader.classList.remove('active');

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 300)
    }
}, 2500);

window.addEventListener('load', function () {

    (function loader() {
        if (!document.querySelector('.loader')) {
            return;
        }

        const loader = document.querySelector('.loader');

        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
        }

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 1500);

    })();

    (function form() {
        (function validate() {
            const form = $('form');

            $.each(form, function () {
                $(this).validate({
                    ignore: [],
                    errorClass: 'error',
                    validClass: 'success',
                    rules: {
                        your_name: {
                            required: true
                        },
                        your_email: {
                            required: true,
                            email: true
                        },
                        checkbox: {
                            required: true
                        }
                    },
                    errorElement : 'span',
                    errorPlacement: function(error, element) {
                        const placement = $(element).data('error');
                        if (placement) {
                            $(placement).append(error);
                        } else {
                            error.insertBefore(element);
                        }
                    },
                    messages: {
                        email: 'Некорректный e-mail'
                    }
                });
            });
            $.validator.addMethod('email', function (value, element) {
                return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
            });
        })();
    })();

    (function scroll() {
        if (!isMobile) return;

        const btn = document.querySelector('.right__mob-img');
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            scrollTo('left');
        })
    })();
});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}

function scrollTo(id) {
    const element = document.getElementById(id);

    const y = element.getBoundingClientRect().top + window.scrollY;

    window.scroll({
        top: y,
        behavior: 'smooth'
    });
}