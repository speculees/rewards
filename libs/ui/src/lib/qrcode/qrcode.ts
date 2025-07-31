import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'rui-qrcode',
  imports: [CommonModule],
  template: `<canvas #canvas></canvas>`,
  styleUrl: './qrcode.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrcodeComponent implements AfterViewChecked {
  @Input() value = '';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewChecked() {
    QRCode.toCanvas(this.canvas.nativeElement, this.value, function (error) {
      if (error) console.error(error);
    });
  }
}
