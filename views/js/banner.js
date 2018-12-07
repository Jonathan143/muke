console.log(1);
let oBanner = document.querySelector("#banner");
let studentList = document.querySelector(".studentlist");
let stuLi = studentList.querySelectorAll("li");
let aPrev = document.querySelector(".prev");
let aNext = document.querySelector(".next");
let circle = document.querySelector(".circle");
let cirLi = circle.querySelectorAll("li");
let bw = 1200;
let timer = null;
let index = 0;
let date = new Date();
aNext.onclick = function () {
    if (new Date() - date > 800) {
        cirLi[index].classList.remove("active");
        index++;
        if (index == stuLi.length - 1) {
            cirLi[0].classList.add("active");
        } else {
            cirLi[index].classList.add("active");
        }
        Move(studentList, {
            left: -bw * index
        }, 750, null, function () {
            //stuLi.length = 7
            //最大的下标为 6
            if (index == stuLi.length - 1) {
                this.style.left = 0;
                index = 0;
                console.log("切换到第二个第一张");
            }
        });
    }
    date = new Date();
};
//点击上一个
aPrev.onclick = function () {
    if (new Date() - date > 800) {
        cirLi[index].classList.remove("active");
        if (index == 0) {
            studentList.style.left = -(stuLi.length - 1) * bw + "px";
            index = stuLi.length - 1;
        }
        index--;
        cirLi[index].classList.add("active");
        Move(studentList, {
            left: -bw * index
        }, 750);

    }
    date = new Date();
};
for (let i = 0; i < cirLi.length; i++) {
    cirLi[i].i = i;
    cirLi[i].onclick = function () {
        cirLi[index].classList.remove("active");
        index = this.i;//更新下标index
        cirLi[index].classList.add("active");
        Move(studentList, {
            left: -bw * index
        }, 750);
    };
}
oBanner.onmouseover = function () {
    clearInterval(timer);
};
oBanner.onmouseleave = function () {
    timer = setInterval(change, 1500);
};
//自动切换
timer = setInterval(change, 1500);

function change() {
    if (new Date() - date > 800) {
        cirLi[index].classList.remove("active");
        index++;
        if (index == stuLi.length - 1) {
            cirLi[0].classList.add("active");
        } else {
            cirLi[index].classList.add("active");
        }
        Move(studentList, {
            left: -bw * index
        }, 750, null, function () {
            //stuLi.length = 7
            //最大的下标为 6
            if (index == stuLi.length - 1) {
                this.style.left = 0;
                index = 0;
                console.log("切换到第二个第一张");
            }
        });
    }
    date = new Date();
}
