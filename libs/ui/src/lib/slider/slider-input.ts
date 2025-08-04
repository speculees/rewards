import {
  booleanAttribute,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  numberAttribute,
  Output,
  Renderer2
} from "@angular/core";
import { Platform } from "@angular/cdk/platform";
import { RUI_SLIDER, RUI_SLIDER_THUMB, SliderDragEvent } from "./slider-interface";

@Directive({
  selector: 'input[ruiSliderThumb]',
  host: {
    'class': 'rui-slider__input',
    'type': 'range',
    '(blur)': '_isFocused = false',
    '(focus)': '_isFocused = true'
  },
  providers: [
    { provide: RUI_SLIDER_THUMB, useExisting: SliderThumb }
  ]
})
export class SliderThumb {

  private readonly renderer = inject(Renderer2);
  private readonly _slider = inject(RUI_SLIDER);
  private readonly ngZone = inject(NgZone);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _platform = inject(Platform);
  private _isActive = false;
  private _skipUIUpdate = false;
  private _isFocused = false;
  private _initialValue: string | undefined;
  private _hasSetInitialValue = false;
  readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

/** @docs-private */
  get min(): number {
    return numberAttribute(this.el.nativeElement.min, 0);
  }
  set min(v: number) {
    this.el.nativeElement.min = v + '';
    this._cdr.detectChanges();
  }

  /** @docs-private */
  get max(): number {
    return numberAttribute(this.el.nativeElement.max, 0);
  }
  set max(v: number) {
    this.el.nativeElement.max = v + '';
    this._cdr.detectChanges();
  }

  get step(): number {
    return numberAttribute(this.el.nativeElement.step, 0);
  }
  set step(v: number) {
    this.el.nativeElement.step = v + '';
    this._cdr.detectChanges();
  }

  /** @docs-private */
  get disabled(): boolean {
    return booleanAttribute(this.el.nativeElement.disabled);
  }
  set disabled(v: boolean) {
    this.el.nativeElement.disabled = v;
    this._cdr.detectChanges();

    if (this._slider.disabled !== this.disabled) {
      this._slider.disabled = this.disabled;
    }
  }

  /**
   * The current translateX in px of the slider visual thumb.
   * @docs-private
   */
  get translateX(): number {
    if (this._slider.min >= this._slider.max) {
      this._translateX = this._tickMarkOffset;
      return this._translateX;
    }

    return this._translateX;
  }
  set translateX(v: number) {
    this._translateX = v;
  }
  private _translateX = 0;
  private _tickMarkOffset = 0;

  @Input({ transform: numberAttribute }) value = 0;
  @Output() readonly valueChange = new EventEmitter<number>();

  /** Event emitted when the slider thumb starts being dragged. */
  @Output() readonly dragStart: EventEmitter<SliderDragEvent> =
    new EventEmitter<SliderDragEvent>();

  /** Event emitted when the slider thumb stops being dragged. */
  @Output() readonly dragEnd: EventEmitter<SliderDragEvent> =
    new EventEmitter<SliderDragEvent>();

  get fillPercentage(): number {
    if (!this._slider._cachedWidth) {
      return this._slider._isRtl ? 1 : 0;
    }
    if (this._translateX === 0) {
      return 0;
    }
    return this.translateX / this._slider._cachedWidth;
  }


  constructor() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.listen(this.el.nativeElement, 'pointerdown', this._onPointerDown.bind(this)),
      this.renderer.listen(this.el.nativeElement, 'pointermove', this._onPointerMove.bind(this)),
      this.renderer.listen(this.el.nativeElement, 'pointerup', this._onPointerUp.bind(this));
    });
  }

  private _onPointerDown(event: PointerEvent) {
    if (this.disabled || event.button !== 0) return;

    this._isActive = true;
    this._isFocused = true;

    // Does nothing if a step is defined because we
    // want the value to snap to the values on input.
    if (!this._slider.step) {
      this._updateThumbUIByPointerEvent(event, { withAnimation: true });
    }

    this._handleValueCorrection(event);
    this.dragStart.emit({source: this, parent: this._slider, value: this.value});
  }

    /**
   * Corrects the value of the slider on pointer up/down.
   *
   * Called on pointer down and up because the value is set based
   * on the inactive width instead of the active width.
   */
  private _handleValueCorrection(event: PointerEvent): void {
    // Don't update the UI with the current value! The value on pointerdown
    // and pointerup is calculated in the split second before the input(s)
    // resize. See _updateWidthInactive() and _updateWidthActive() for more
    // details.
    this._skipUIUpdate = true;

    // Note that this function gets triggered before the actual value of the
    // slider is updated. This means if we were to set the value here, it
    // would immediately be overwritten. Using setTimeout ensures the setting
    // of the value happens after the value has been updated by the
    // pointerdown event.
    setTimeout(() => {
      this._skipUIUpdate = false;
      this._fixValue(event);
    }, 0);
  }

   /** Corrects the value of the slider based on the pointer event's position. */
  private _fixValue(event: PointerEvent): void {
    const xPos = event.clientX - this._slider._cachedLeft;
    const width = this._slider._cachedWidth;
    const step = this._slider.step === 0 ? 1 : this._slider.step;
    const numSteps = Math.floor((this._slider.max - this._slider.min) / step);
    const percentage = this._slider._isRtl ? 1 - xPos / width : xPos / width;

    // To ensure the percentage is rounded to the necessary number of decimals.
    const fixedPercentage = Math.round(percentage * numSteps) / numSteps;

    const impreciseValue =
      fixedPercentage * (this._slider.max - this._slider.min) + this._slider.min;
    const value = Math.round(impreciseValue / step) * step;
    const prevValue = this.value;

    if (value === prevValue) {
      // Because we prevented UI updates, if it turns out that the race
      // condition didn't happen and the value is already correct, we
      // have to apply the ui updates now.

      //this._slider._onValueChange(this);
      // this._slider.step > 0
      //   ? this._updateThumbUIByValue()
      //   : this._updateThumbUIByPointerEvent(event, {withAnimation: this._slider._hasAnimation});

      this._updateThumbUIByPointerEvent(event, {withAnimation: true});
      return;
    }

    this.value = value;
    this.valueChange.emit(this.value);
    // this._onChangeFn?.(this.value);
    // this._slider._onValueChange(this);
    // this._slider.step > 0
    //   ? this._updateThumbUIByValue()
    //   : this._updateThumbUIByPointerEvent(event, {withAnimation: this._slider._hasAnimation});
    this._updateThumbUIByPointerEvent(event, {withAnimation: true});
  }

  private _onPointerMove(event: PointerEvent) {
    if (!this._slider.step && this._isActive) {
      this._updateThumbUIByPointerEvent(event);
    }
  }

  _updateThumbUIByPointerEvent(event: PointerEvent, options?: { withAnimation: boolean }): void {
    this.translateX = this._clamp(this._calcTranslateXByPointerEvent(event));
    this._updateThumbUI(options);
  }

  _calcTranslateXByPointerEvent(event: PointerEvent): number {
    return event.clientX - this._slider._cachedLeft;
  }

  _clamp(v: number): number {
    const min = this._tickMarkOffset;
    const max = this._slider._cachedWidth - this._tickMarkOffset;
    return Math.max(Math.min(v, max), min);
  }

  _updateThumbUI(options?: {withAnimation: boolean}) {
    //this._slider._setTransition(!!options?.withAnimation);
    this._slider._onTranslateXChange(this);
  }

  private _onPointerUp() {
    if (this._isActive) {
      this._isActive = false;
      if (this._platform.SAFARI) {
        this._isFocused = false;
      }
      this.dragEnd.emit({source: this, parent: this._slider, value: this.value});

      // This setTimeout is to prevent the pointerup from triggering a value
      // change on the input based on the inactive width. It's not clear why
      // but for some reason on IOS this race condition is even more common so
      // the timeout needs to be increased.
      setTimeout(() => this._updateWidthInactive(), this._platform.IOS ? 10 : 0);
    }
  }

  private _updateWidthInactive(): void {
    this.el.nativeElement.style.padding = `0 ${this._slider._knobRadius}px`;
    this.el.nativeElement.style.width = `calc(100% + ${this._slider._knobRadius}px)`;
    this.el.nativeElement.style.marginLeft = `-${this._slider._knobRadius}px`;
  }

  private _initValue(): void {
    this._hasSetInitialValue = true;
    if (this._initialValue === undefined) {
      this.value = this.min;
    } else {
      this.el.nativeElement.value = this._initialValue;
      // this._updateThumbUIByValue();
      // this._slider._onValueChange(this);
      this._cdr.detectChanges();
    }
  }

  initProps(): void {
    this._updateWidthInactive();

    // If this or the parent slider is disabled, just make everything disabled.
    if (this.disabled !== this._slider.disabled) {
      // The MatSlider setter for disabled will relay this and disable both inputs.
      this._slider.disabled = true;
    }

    this.step = this._slider.step;
    this.min = this._slider.min;
    this.max = this._slider.max;
    this._initValue();
  }

  focus(): void {
    this.el.nativeElement.focus();
  }

  blur(): void {
    this.el.nativeElement.blur();
  }
}
