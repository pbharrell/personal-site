'use strict';

// const switcher = document.querySelector('.theme-switch');

// switcher.addEventListener('click', function() {
//     document.body.classList.toggle('light-theme');
//     document.body.classList.toggle('dark-theme');

//     const className = document.body.className;
//     if(className == "light-theme") {
//         this.textContent = "Dark";
//     } else {
//         this.textContent = "Light";
//     }

//     console.log('current class name: ' + className);
// });

// function set_fade_pos() {
//     var fade_left = document.getElementsByClassName("fade-left")[0];
//     var fade_right = document.getElementsByClassName("fade-right")[0];
//     var page_wrapper = document.getElementById("page_wrapper");

//     // console.log(fade_left)

//     var top_pos = 50 + 60 + 15 - 5 + page_wrapper.style.height;
    
//     fade_left.style.top = top_pos;
//     fade_right.style.top = top_pos;

//     // for (var i = 0; i < page_text_list.length; i++) {
//     //     console.log(page_text_list[i].children[0]);
//     //     console.log(page_text_list[i].children[0].style.padding);
//     //     page_underline_list[i].children[0].style = page_text_list[i].children[0].style;
//     //     page_underline_list[i].style.width = page_text_list[i].children[0].style.width;
//     // }

//     // for (var i = 0; i < page_underline_list.length; i++) {
//     //     console.log(page_underline_list[i]);
//     // }

    


//     // $setter.siblings(".wrap").css("max-width", $setter.width()+"px");

// }

window.onresize = set_fade_pos;