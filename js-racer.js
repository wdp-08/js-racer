"use strict"
//

function dice(){
  let change_dice = 0;
  let ang_dadu = [1,2,3,4,5];
  change_dice=ang_dadu[Math.floor(Math.random()*3)];
  return change_dice;
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//BOARD
function print_board(totalPlayer, trackLength) {
  let temp_board = [];
  let players = selectPlayer(totalPlayer);
  for (let i = 0; i < players.length; i++) {
    let line = print_line(players[i], 0, trackLength);
    temp_board.push(line.join('|'));
  }
  return temp_board;
}


function startPlay(totalPlayer, trackLength) {
  let board = print_board(totalPlayer, trackLength);
  let players = selectPlayer(totalPlayer);  //[a,b,c]
  let positions = [];
  let newPos = 0;
  let pause = sleep(3);
  let win = '';
  // let a = 0;
  console.log(board.join('\n'));
  while (newPos<trackLength-1) {
    reset_board();
    for (let i = 0; i < players.length; i++) {
      positions.push(board[i].indexOf(players[i]));
      let dadu =  dice();
      newPos += positions[i]+dadu;
      if (newPos>=trackLength-1) {
        newPos = trackLength-1;
        let newLine = print_line(players[i], newPos, trackLength);
        board[i]=newLine.join('|');
        win = players[i];
        break;
      }
      let newLine = print_line(players[i], newPos, trackLength);
      board[i]=newLine.join('|');
      // console.log(positions);
    }
    // console.log(dadu);
    console.log(board.join('\n'));
    sleep(700);
  }
  // console.log(winner);
  // win = winner(champ);
  return winner(win);
}


function print_line(playerName, posPlayer, trackLength) {
  let temp_line = [];
  for (let i = 0; i < trackLength; i++) {
    if (i === posPlayer) {
      temp_line.push(playerName);
    }
    else {
      temp_line.push(' ');
    }

  }
  return temp_line;
}

function selectPlayer(player) {
  let pil_pemain = 'abcdefghijklmnopqrstuvwxyz';
  let pemain = [];
  for (let i = 0; i < player; i++) {
    pemain.push(pil_pemain[i]);
  }
  return pemain;
}


function winner(win) {
  return `Player '${win}' is the winner`;
}


function reset_board() {
  console.log("\x1B[2J")
}

let argv = process.argv;
let totalPlayer = argv[2];
let trackLength = argv[3];

console.log(startPlay(totalPlayer,trackLength));