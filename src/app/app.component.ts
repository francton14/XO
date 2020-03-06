import {Component, OnInit} from '@angular/core';
import {XoEnum} from './xo.enum';
import {StatusEnum} from './status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  board = Array<number>(9);
  xoMapper = XoEnum;
  statusMapper = StatusEnum;
  xo = XoEnum.X;
  boardStatus: {
    status: StatusEnum,
    winner: XoEnum
  };

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.board.fill(undefined);
    this.boardStatus = {
      status: StatusEnum.ONGOING,
      winner: undefined
    };
  }

  onTileClick(index: number) {
    if (this.boardStatus.status === StatusEnum.ONGOING && !this.board[index]) {
      this.board[index] = this.xo;
      this.xo = this.xo === XoEnum.X ? XoEnum.O : XoEnum.X;
      this.boardStatus = this.getBoardStatus();
    }
  }

  getBoardStatus() {
    const start = [0, 1, 2, 0, 3, 6, 0, 2];
    const inc   = [3, 3, 3, 1, 1, 1, 4, 2];
    let stillHasUnfilledTile = false;
    for (let i = 0; i < start.length; i++) {
      let sum = 0;
      for  (let j = start[i]; j <= start[i] + (inc[i] * 2); j += inc[i]) {
        stillHasUnfilledTile = stillHasUnfilledTile || this.board[j] === undefined;
        sum += this.board[start[i]] === this.board[j] ? this.board[j] : 0;
      }
      if (sum > 0 && sum % 3 === 0) {
        return {
          status: StatusEnum.WIN,
          winner: sum / 3
        };
      }
    }
    return {
      status: stillHasUnfilledTile ? StatusEnum.ONGOING : StatusEnum.DRAW,
      winner: undefined
    };
  }
}
