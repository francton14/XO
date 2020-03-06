import {Component, EventEmitter, Input,  Output} from '@angular/core';
import {XoEnum} from '../xo.enum';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input()
  symbol: string;
}
