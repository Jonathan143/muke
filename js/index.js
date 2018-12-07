/*
 * @Author: 杨健_Jonathan 
 * @Date: 2018-11-29 14:31:52 
 * @Last Modified by: 杨健_Jonathan
 * @Last Modified time: 2018-12-04 13:02:13
 */

// -------购物车---显示--隐藏------------
$('#shopCar').hover(() => {
    $('.car').css({
        display: 'block'
    })
}, () => {
    clearTimeout('timer');
    $('.car').css({
        display: 'none'
    })
})

//--------搜索框----样式变化------------
let search = $(".search");
let searchInput = search.children("input");
let searchI = search.children("i");
searchInput.focus(() => {
    search.css({
        borderBottom: '1px solid #F01414',
    })
    searchI.css({
        backgroundColor: 'rgba(240,20,20,.4)',
        color: '#F01414'
    })
    $('.search-sno').css({
        display: 'none'
    })
})
searchInput.blur(() => {
    search.css({
        borderBottom: '1px solid #4D555D',
    })
    searchI.css({
        backgroundColor: '',
        color: '#4D555D'
    })
    $('.search-sno').css({
        display: 'block'
    })
})
$('.newcomer').children('i').click(() => {
    $('.newcomer').css({
        display: 'none',
    })
})


// -----------banner----------------
let imgBox = $('.imgBox');
let aImg = imgBox.children('a')
let imgWidth = aImg.children('img').eq(0).width();
let dot = $('.dot').children('i');
let index = 0;

$('#pre').click(() => {
    if (index == 0) {
        index = aImg.length - 2;
        imgBox.css({
            left: -imgWidth * (aImg.length - 1),
        })
    } else {
        index--;
    }
    imgBox.stop().animate({
        left: -index * imgWidth
    })
    dotActive();
})
$('#next').click(() => {
    if (index == aImg.length - 1) {
        index = 1;
        imgBox.css({
            left: 0,
        })
    } else {
        index++;
    }
    imgBox.stop().animate({
        left: -imgWidth * index,
    });
    dotActive();
})
let timer = '';

function bannerAutoPlay() {
    clearInterval(timer)
    timer = setInterval(function () {
        if (index == aImg.length - 1) {
            index = 1;
            imgBox.css({
                left: 0,
            })
        } else {
            index++;
        }
        imgBox.stop().animate({
            left: -imgWidth * index,
        });
        dotActive();
    }, 3000);
}
bannerAutoPlay();

function dotActive() {
    for (let i = 0; i < dot.length; i++) {
        dot.eq(i).removeClass('active');
    }
    let a = index;
    if (a == 6) {
        a = 0
    }
    dot.eq(a).addClass('active');
};

function dotClick() {
    for (let j = 0; j < dot.length; j++) {
        dot.eq(j).click(function () {
            for (let i = 0; i < dot.length; i++) {
                dot.eq(i).removeClass('active');
            }
            dot.eq($(this).index()).addClass('active');
            index = $(this).index();
            imgBox.css({
                left: -imgWidth * $(this).index(),
            })
            // imgBox.stop().animate({
            //     left: -imgWidth * $(this).index(),
            // });
        })
    }
}
dotClick();
$('.ban').mouseenter(() => {
    clearInterval(timer)
})
$('.ban').mouseleave(() => {
    bannerAutoPlay();
});

// goback
$(window).scroll(function(){
    if ($(window).scrollTop()>500){
        $("#goTop").fadeIn(500);
    }
    else
    {
        $("#goTop").fadeOut(500);
    }
});

$('#goTop').click(()=>{
    $('body,html').animate({scrollTop:0},1000);
    return false;
})


// ----------登录注册-----------
$("#login").click(function () {
    $(".hide-center").fadeIn("slow");
    $(".overCurtain").fadeIn("slow");
})
$("#close").click(function () {
    $(".hide-center").fadeOut("slow")
    $(".overCurtain").fadeOut("slow")
})

$("#register").click(function () {
    $(".hide-center").fadeIn("slow");
    $(".overCurtain").fadeIn("slow");
})
$("#close").click(function () {
    $(".hide-center").fadeOut("slow")
    $(".overCurtain").fadeOut("slow")
})

// -----    模糊层高度-----
$('.overCurtain').css({
    height: $(window).height(),
})