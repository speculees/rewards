import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
  numberAttribute,
  booleanAttribute,
  ViewChild,
  QueryList,
  ContentChild,
  ContentChildren,
  AfterViewInit,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  RUI_SLIDER,
  RUI_SLIDER_RANGE_THUMB,
  RUI_SLIDER_THUMB,
  RUI_SLIDER_VISUAL_THUMB,
  Thumb,
} from './slider-interface';
import type { SliderThumb } from './slider-input';
import { SliderVisualThumb } from './slider-visual-thumb';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'rui-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'rui-slider',
    '[class.rui-slider--focused]': 'focused',
    '[class.rui-slider--disabled]': 'disabled',
  },
  providers: [{ provide: RUI_SLIDER, useExisting: SliderComponent }],
  imports: [SliderVisualThumb]
})
export class SliderComponent implements AfterViewInit {
  private readonly _platform = inject(Platform);
  private readonly _elementRef = inject(ElementRef);

  private _hasViewInitialized = false;

  readonly _knobRadius = 16;

  /** The active portion of the slider track. */
  @ViewChild('trackActive', { static: true }) _trackActive!: ElementRef<HTMLElement>;

  /** The slider thumb(s). */
  @ViewChildren(RUI_SLIDER_VISUAL_THUMB) _thumbs!: QueryList<SliderVisualThumb>;

  /** The sliders hidden range input(s). */
  @ContentChild(RUI_SLIDER_THUMB) _input!: SliderThumb;

  /** The sliders hidden range input(s). */
  @ContentChildren(RUI_SLIDER_RANGE_THUMB, { descendants: false })
  _inputs!: QueryList<{}>;

  @Input({ transform: numberAttribute }) min = 0;
  @Input({ transform: numberAttribute }) max = 100;
  @Input({ transform: numberAttribute }) value = 0;
  @Input({ transform: numberAttribute }) step = 0;
  @Input({ transform: booleanAttribute }) disabled = false;

  _isRange = false;
  _isRtl = false;

  // Stored dimensions to avoid calling getBoundingClientRect redundantly.
  _cachedWidth = 0
  _cachedLeft = 0;

  /** Stores the slider dimensions. */
  _updateDimensions(): void {
    this._cachedWidth = this._elementRef.nativeElement.offsetWidth;
    this._cachedLeft = this._elementRef.nativeElement.getBoundingClientRect().left;
  }

  _updateTrackUI(source: SliderThumb) {
    this._isRange
      ? this._updateTrackUIRange(source)
      : this._updateTrackUINonRange(source);
  }

  _updateTrackUINonRange(source: SliderThumb) {
     this._isRtl
      ? this._setTrackActiveStyles({
          left: 'auto',
          right: '0px',
          transformOrigin: 'right',
          transform: `scaleX(${1 - source.fillPercentage})`,
        })
      : this._setTrackActiveStyles({
          left: '0px',
          right: 'auto',
          transformOrigin: 'left',
          transform: `scaleX(${source.fillPercentage})`,
        });
  }

  _updateTrackUIRange(_source: SliderThumb) {
    // TODO
  }

    /** Sets the styles for the active portion of the track. */
  _setTrackActiveStyles(styles: {
    left: string;
    right: string;
    transform: string;
    transformOrigin: string;
  }): void {
    const trackStyle = this._trackActive.nativeElement.style;

    trackStyle.left = styles.left;
    trackStyle.right = styles.right;
    trackStyle.transformOrigin = styles.transformOrigin;
    trackStyle.transform = styles.transform;
  }

    /** Gets the slider thumb input of the given thumb position. */
  _getInput(thumbPosition: Thumb): SliderThumb | undefined {
    if (thumbPosition === Thumb.END && this._input) {
      return this._input;
    }

    return;
  }

  /** Gets the slider thumb HTML input element of the given thumb position. */
  _getThumb(thumbPosition: Thumb): SliderVisualThumb {
    return thumbPosition === Thumb.END ? this._thumbs?.last! : this._thumbs?.first!;
  }

  _onTranslateXChange(source: SliderThumb): void {
    if (!this._hasViewInitialized) {
      return;
    }

    this._updateThumbUI(source);
    this._updateTrackUI(source);
  }

  // Thumb styles update conditions
  //
  // 1. TranslateX, resize, or dir change
  //    - Reason: The thumb styles need to be updated according to the new translateX.
  // 2. Min, max, or step
  //    - Reason: The value may have silently changed.

  /** Updates the translateX of the given thumb. */
  _updateThumbUI(source: SliderThumb) {
    const thumb = this._getThumb(
      Thumb.END
      //source.thumbPosition === Thumb.END ? Thumb.END : Thumb.START,
    )!;
    thumb._hostElement.style.transform = `translateX(${source.translateX}px)`;
  }

  private _initUINonRange(eInput: SliderThumb): void {
    eInput.initProps();
    //eInput.initUI();

    // this._updateValueIndicatorUI(eInput);

    this._hasViewInitialized = true;
    // eInput._updateThumbUIByValue();
  }

  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._updateDimensions();
    }

    const eInput = this._getInput(Thumb.END);
    const sInput = this._getInput(Thumb.START);
    this._isRange = !!eInput && !!sInput;
    this._isRtl = document.dir === 'rtl';

    const thumb = this._getThumb(Thumb.END);

    this._initUINonRange(eInput!);
    this._updateTrackUI(eInput!);
  }
}
