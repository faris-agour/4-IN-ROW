var t = $("tr")
var p = $("h4")
var b = $("button")
var myheader = document.querySelector("h1")


n1 = prompt("enter your name , you're the blue one ..")
n1=n1.toUpperCase()
n1c = "rgb(36 33 251 / 78%)"

n2 = prompt("and your name , red one ..")
n2=n2.toUpperCase()
n2c = "rgb(255 0 0 / 66%)"

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeh1(){
    cinput=getRandomColor()
    myheader.style.color = cinput;
}






function changecolor(rindex, cindex, color) {
    return $("tr").eq(rindex).find("td").eq(cindex).find("button").css("background-color",color)
}
function takecolor(rindex, cindex) {
    return $("tr").eq(rindex).find("td").eq(cindex).find("button").css("background-color")
}
function checkbtn(cindex) {
    for (let row = 5; row >= 0; row--) {
    let cColor = takecolor(row, cindex);
    if (cColor == "rgb(202, 202, 202)") {
        return row;
        }
    }
}

function win(o, t, th, f) {
    return (o==t && o==th && o==f && o!="rgb(202, 202, 202)" ) 
}

function Horz() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (win(takecolor(row, col), takecolor(row, col + 1), takecolor(row, col + 2), takecolor(row, col + 3))) {
                return true
            }
            else continue
        }
    }
    return false
}
function vert() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (win(takecolor(row, col), takecolor(row+ 1, col ), takecolor(row + 2, col), takecolor(row+ 3, col ))) {

                return true
            }
            else continue
        }
    }return false
    }

function diag() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            if (win(takecolor(row, col), takecolor(row + 1, col + 1), takecolor(row + 2, col + 2), takecolor(row + 3, col + 3))) {

                return true
            }
            else if (win(takecolor(row, col), takecolor(row - 1, col + 1), takecolor(row - 2, col + 2), takecolor(row - 3, col + 3))) {

                return true
            }
            else continue
        }
    }return false
}
currentn = n1
currentc = n1c
currentPlayerTurn = 1;
game = true
colorInterval=null

p.text(n1 + ", your turn");
p.css("color", "rgb(2 0 131)")
        

b.on("click", function () {

    if (!game) {
        alert(" GAME OVER !!! ")
        return
    }
    var col = $(this).closest("td").index()

    var avlbtn = checkbtn(col)

    changecolor(avlbtn, col,currentc ) 

    if (Horz() || vert() || diag()) {
        $("h4").fadeOut("fast");
        $("h1").text(" THE WINNER IS " + currentn);
        colorInterval = setInterval("changeh1()", 300)
        game = false;
    }
    currentPlayerTurn *= -1;

    if (currentPlayerTurn == 1) {
    currentc = n1c;
    currentn = n1;
        p.text(n1 + ", your turn");
        p.css("color","rgb(2 0 131)")
    } else {
    currentc = n2c;
    currentn = n2;
        p.text(n2 + ", your turn");
        p.css("color","rgb(163 1 1)")
    }
});
var res=$("#r")                 // mange the restart button
res.on("click",function(){
    for (var i = 0; i < t.length; i++){
        for (let j = 0; j < $("td").length; j++) {
        b.css=("background-color","rgb(202, 202, 202)")
            changecolor(i, j, "rgb(202, 202, 202)")
            
        }
    }
    game = true
    $("h1").text(" let's get started :")
    clearInterval(colorInterval);
    $("h1").css("color", "black")
    $("h4").fadeIn("fast");
})