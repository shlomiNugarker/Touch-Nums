'use strict';


var nextNum = 1;
var startTime = 1;
var isFirstClick = true;
var intervalId;
var sound = new Audio('sound/pop.mp3')

function init() {
    renderBoard(4)
}

function renderBoard(num) {
    if(nextNum > 1) return;
    clearInterval(intervalId);
    startTime = 0;
    nextNum = 1;

    var strHTML = '';
    var nums = [];

    for(var j = 1; j <= (num**2); ++j) {
        nums.push(j);
    }
    var suffledNums = shuffle(nums)
    var currIdx = 0;
    
    for( var i = 0; i < num; i++) {
        strHTML += '<tr>';
        for(var j = 0; j < num; j++) {
            strHTML += `<td class="" data-amount="${suffledNums.length}" onclick="cellClicked(this)">${suffledNums[currIdx++]}</td>`
        }
        strHTML += '</tr>';
    }
    var elnum = document.querySelector('.board');
    elnum.innerHTML = strHTML;
}

function cellClicked(clickedNum) {
    if(isFirstClick) {
        startTime = 0;
        isFirstClick =false;
        intervalId = setInterval(() =>  {
            startTime++;
            document.querySelector('.timer').innerText = ` ${startTime/100}`;
        },10)
    }
    var currCellNum = +(clickedNum.innerText)
    var amountOfNums = +(clickedNum.dataset.amount)
    if(currCellNum === nextNum) {
        sound.play();
        nextNum++;
        clickedNum.classList.add('marked');
    }
    if(nextNum-1 === amountOfNums) {
        isFirstClick = true;
        nextNum = 1;
        document.querySelector('.restart').style.opacity = 1;
        var allClass= document.querySelectorAll('.marked');
        // document.querySelector('.timer').innerText = 'מרגש';
        setTimeout(() => {
            startTime = 0;
            for(var i = 0; i < allClass.length; i++) {
                allClass[i].classList.remove('marked')
            }
        } ,2000)
        clearInterval(intervalId)
    }
    document.querySelector('.next-num').innerText = `Next number: ${nextNum}`;
}

function restartGame() {
    renderBoard(2)
    document.querySelector('.restart').style.opacity = 0;
    startTime = 0
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}