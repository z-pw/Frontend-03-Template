let chessBoard = document.getElementById('game');

let chessBoardData = [2, 2, 2, 2, 2, 2, 2, 2, 2,];
let chessBoardType = { 0 : "⭕️", 1 : "❌", 2 : " "};
let first = 0; // 0 ⭕️ | 1 ❌
let now = 0; //  0 ⭕️ | 1 ❌ | 2 null |
let sum = 0;

function show() {
    let row = 1; // 行
    let col = 1; // 列
    chessBoard.innerHTML = ""
    for (let item of chessBoardData) {
        let grid = document.createElement("div")
        grid.innerText = chessBoardType[item];
        grid.classList.add("grid", "grid"+row+col);
        let r = row;
        let c = col;
        grid.addEventListener("click", () => userMove(r - 1, c));
        chessBoard.appendChild(grid);

        if (col % 3 === 0) {
            chessBoard.appendChild(document.createElement("br"));
            col = 0;
            row++;
        }
        col++
    }
}

function userMove(row, col) {
    if (sum + 1 === 8){
        alert("和");
        return;
    }
    if (now === 0) now = first;

    if (chessBoardData[row * 3 + col - 1] === 2) {
        chessBoardData[row * 3 + col - 1] = now;
        if (check(chessBoardData, now)) {
            alert(now === 0 ? chessBoardType[0] + "win" : chessBoardType[1] + "win");
            show();
            return ;
        }
        now = (now + 1) % 2;
        sum++;
        show()
        if (willWin(chessBoardData, now)) {
            console.log(now === 0 ? chessBoardType[0] + "will win" : chessBoardType[1] + "will win" )
        }
    }
    computerMove()
}

function computerMove() {
    if (sum + 1 === 8){
        alert("和");
        return;
    }
    let p = bestPoint(chessBoardData, now);
    if (p.result === -2 && p.point === null) {
        alert(chessBoardType[(now + 1) % 2] + "win")
    }

    chessBoardData[p.point] = now;
    if (check(chessBoardData, now))
        alert(now === 0 ? chessBoardType[0] + "win" : chessBoardType[1] + "win")
    show();
    now = (now + 1) % 2;
    sum++;
    if (willWin(chessBoardData, now)) {
        console.log(now === 0 ? chessBoardType[0] + "will win" : chessBoardType[1] + "will win" )
    }
}

function check(chessBoardData, now){
    for(let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (chessBoardData[i * 3 + j] !== now) {
                win = false;
            }
        }
        if (win)
            return true;
    }

    for(let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (chessBoardData[j * 3 + i] !== now) {
                win = false;
            }
        }
        if (win)
            return true;
    }

    {
        let win = true
        for (let i = 0; i < 3; i++) {
            if (chessBoardData[i * 3 + i] !== now) {
                win = false;
            }
        }
        if (win) {
            return true;
        }
    }
    {
        let win = true
        for (let i = 1; i <= 3; i++) {
            if (chessBoardData[2 * i] !== now) {
                win = false;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;

}

function chessBoardDataCopy(chessBoardData) {
    return JSON.parse(JSON.stringify(chessBoardData));
}

function willWin(chessBoardData, now){
    let cStatus;
    for(let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (chessBoardData[i * 3 + j] !== 2) {
                cStatus = true;
                continue;
            }
            cStatus = false;
            let tmp = chessBoardDataCopy(chessBoardData);
            tmp[i * 3 + j]= now;
            if (check(tmp, now)) {
                return i*3+j;
            }
        }
    }
    return null;
}

function bestPoint(chessBoardData, now){
    let point = willWin(chessBoardData, now);
    if (point !== null) {
        return {
            point: point,
            result: 1,
        }
    }
    let result = -2;
    outer:for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (chessBoardData[i * 3 + j] !== 2)
                    continue;
                let tmp = chessBoardDataCopy(chessBoardData);
                tmp[i * 3 + j] = now;
                let r = willWin(tmp, (now + 1) % 2);

                if (-r > result) {
                    result = -r;
                    point = [i * 3 + j]
                }

                if (result === 1) {
                    break outer;
                }
            }
    }
    return {
        point,
        result
    }
}

show()
