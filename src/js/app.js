'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';


// Проверка поддержки webP
baseFunction.testWebP();

//Инит Fancybox
Fancybox.bind("[data-fancybox]", {
    hideScrollbar: false,
    Image: {
        zoom: false,
    },
});


const tippyElems = tippy(document.querySelectorAll('.tooltip-element'), {
    hideOnClick: true,
    interactive: true,
    allowHTML: true,
    placement: 'bottom',
    trigger: "click",
    content(reference) {
        const content = reference.getAttribute('data-content');
        return `<div class="tippy-wrapper">
                    ${content}
                    <div class="close-tippy"></div>
                </div>`;
    }
});


document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }
    if (target.closest('.close-tippy')) {
        tippyElems.forEach(item => item.hide());
    }
    if ((target.closest('.submited-modal__wrapper') && !target.closest('.submited-modal')) || target.closest('.submited-modal__close')) {
        target.closest('.article-form').classList.remove('submited');
    }


});




const articleSlider = new Swiper('.article-page__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

const audioPlayers = document.querySelectorAll(".article-audio");
if (audioPlayers.length > 0) {
    audioPlayers.forEach(audioPlayer => {
        const filePath = audioPlayer.dataset.href;
        const audio = new Audio(filePath);
        audio.addEventListener("loadeddata", () => audio.volume = 1, false);
        //click on timeline to skip around
        const timeline = audioPlayer.querySelector(".timeline");
        timeline.addEventListener("click", e => {
            const timelineWidth = window.getComputedStyle(timeline).width;
            const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
            audio.currentTime = timeToSeek;
        }, false);

        //check audio percentage and update time accordingly
        setInterval(() => {
            const progressBar = audioPlayer.querySelector(".progress");
            progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
        }, 500);
        //toggle between playing and pausing on button click
        const playBtn = audioPlayer.querySelector(".controls .toggle-play");
        playBtn.addEventListener(
            "click",
            () => {
                if (audio.paused) {
                    playBtn.classList.remove("play");
                    playBtn.classList.add("pause");
                    audio.play();
                } else {
                    playBtn.classList.remove("pause");
                    playBtn.classList.add("play");
                    audio.pause();
                }
            },
            false
        );

        audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
            const volumeEl = audioPlayer.querySelector(".volume-container");
            audio.muted = !audio.muted;
            volumeEl.classList.toggle('mute');

        });
    })
}


$("[data-toggle-elem]").click(function () {
    $(this).parent().toggleClass('open')
    $(this).parent().find("[data-toggle-content]").slideToggle("slow");
});


$("#to-top").click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});



const articleForm = document.querySelector('#article-form');
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reqFields = articleForm.querySelectorAll('._req');

    reqFields.forEach(field => {
        if (field.value.trim().length < 1) field.classList.add('_error');
        field.addEventListener('focus', (e) => {
            if (field.classList.contains('_error')) {
                field.classList.remove('_error')
            }
        }, { once: true });
    });

    const errorFields = articleForm.querySelectorAll('._error');
    if (errorFields.length == 0) {
        articleForm.classList.add('submited');
        articleForm.reset();
    }

});


const articleSurveys = document.querySelectorAll('.article-survey');
articleSurveys.forEach(articleSurvey => {
    articleSurvey.addEventListener('submit', (e) => {
        e.preventDefault();
        const surveyInputs = Array.from(articleSurvey.querySelectorAll('input[type="radio"]'));
        if (surveyInputs.filter(item => item.checked).length > 0) {
            articleSurvey.classList.add('complited')
        }
    });
})



