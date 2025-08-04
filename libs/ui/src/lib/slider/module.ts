import { NgModule } from '@angular/core';
import { SliderComponent } from './slider';
import { SliderVisualThumb } from './slider-visual-thumb';
import { SliderThumb } from './slider-input';

@NgModule({
  imports: [
    SliderComponent,
    SliderVisualThumb,
    SliderThumb,
  ],
  exports: [SliderComponent, SliderThumb],
})
export class SliderModule {}
