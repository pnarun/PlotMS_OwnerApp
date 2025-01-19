import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-box',
  standalone: true,
  imports: [],
  templateUrl: './msg-box.component.html',
  styleUrl: './msg-box.component.css'
})
export class MsgBoxComponent {
  @Input() show: boolean = false;
  @Input() projectName: string = '';
  @Input() plotNumber: string = '';
}
