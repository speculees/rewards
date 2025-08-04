import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation
} from "@angular/core";
import { RUI_SLIDER_VISUAL_THUMB } from "./slider-interface";

@Component({
  selector: 'rui-slider-visual-thumb',
  templateUrl: './slider-visual-thumb.html',
  styleUrl: './slider-visual-thumb.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: RUI_SLIDER_VISUAL_THUMB, useExisting: SliderVisualThumb }],
  host: {
    'class': 'rui-slider__thumb',
  }
})
export class SliderVisualThumb {
  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  readonly _hostElement = this._elementRef.nativeElement;
  // private readonly _ngZone = inject(NgZone);
  // private readonly _slider = inject<SliderComponent>(SliderComponent);
  // private readonly _renderer = inject(Renderer2);
  // private readonly _listenerCleanups: (() => void)[] = [];
  // private _isActive = false;
  // private _sliderInput?: SliderThumb;

  // readonly _cdr = inject(ChangeDetectorRef);

  // /** Indicates which slider thumb this input corresponds to. */
  // @Input() thumbPosition!: Thumb;

  // /** The slider thumb knob. */
  // @ViewChild('knob', { static: true }) knob!: ElementRef<HTMLElement>;

  // ngAfterViewInit(): void {
  //   const sliderInput = this._slider._getInput(this.thumbPosition);
  //   if (!sliderInput) return;

  //   this._sliderInput = sliderInput;

  //   // These listeners don't update any data bindings so we bind them outside
  //   // of the NgZone to prevent Angular from needlessly running change detection.
  //   this._ngZone.runOutsideAngular(() => {
  //     const input = this._sliderInput!.el.nativeElement;
  //     const renderer = this._renderer;
  //     this._listenerCleanups = [
  //       renderer.listen(input, 'pointermove', this._onPointerMove.bind(this)),
  //       renderer.listen(input, 'pointerdown', this._onDragStart.bind(this)),
  //       renderer.listen(input, 'pointerup', this._onDragEnd.bind(this)),
  //       renderer.listen(input, 'pointerleave', this._onMouseLeave.bind(this)),
  //       renderer.listen(input, 'focus', this._onFocus.bind(this)),
  //       renderer.listen(input, 'blur', this._onBlur.bind(this)),
  //     ];
  //   });
  // }

  // ngOnDestroy(): void {
  //   this._listenerCleanups.forEach((cleanup) => cleanup());
  // }

  // private _onPointerMove(event: PointerEvent): void {
  //   if (!this._isActive) return;
  //   this._slider._onPointerMove(event);
  // }

  // private _onDragStart(): void {
  //   this._isActive = true;
  // }

  // private _onDragEnd(): void {
  //   this._isActive = false;
  // }

  // private _onMouseLeave(): void {
  //   this._isActive = false;
  // }
}
