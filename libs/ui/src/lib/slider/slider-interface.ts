import { InjectionToken } from "@angular/core";
import { SliderComponent } from "./slider";
import { SliderThumb } from "./slider-input";

/**
 * Injection token that can be used to query for a `Slider`.
 * Used primarily to avoid circular imports.
 */
export const RUI_SLIDER = new InjectionToken<SliderComponent>('RUI_SLIDER');

/**
 * Injection token that can be used to query for a `SliderThumb`.
 * Used primarily to avoid circular imports.
 */
export const RUI_SLIDER_THUMB = new InjectionToken<SliderThumb>('RUI_SLIDER_THUMB');

/**
 * Injection token that can be used to query for a `SliderRangeThumb`.
 * Used primarily to avoid circular imports.
 */
export const RUI_SLIDER_RANGE_THUMB = new InjectionToken<{}>('RUI_SLIDER_RANGE_THUMB');

/**
 * Injection token that can be used to query for a `SliderVisualThumb`.
 * Used primarily to avoid circular imports.
 */
export const RUI_SLIDER_VISUAL_THUMB = new InjectionToken<{}>('RUI_SLIDER_VISUAL_THUMB');

/**
 * Thumb types: range slider has two thumbs (START, END) whereas single point
 * slider only has one thumb (END).
 */
export enum Thumb {
  START = 1,
  END = 2,
}

/** Represents a drag event emitted by the Slider component. */
export interface SliderDragEvent {
  /** The SliderThumb that was interacted with. */
  source: SliderThumb;

  /** The Slider that was interacted with. */
  parent: SliderComponent;

  /** The current value of the slider. */
  value: number;
}
