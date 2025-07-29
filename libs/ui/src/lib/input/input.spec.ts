import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input';
import InputHarness from './input-harness';

describe('Input', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  describe('ruiInput', () => {
    it('should be defined', async () => {
      const ruiInput = await loader.getHarness(InputHarness);
      expect(ruiInput).toBeTruthy();
    });

    it('should set disabled', async () => {
      component.disabled = true;
      const ruiInput = await loader.getHarness(InputHarness);
      expect(await ruiInput.isDisabled()).toBe(true);
    });

    it('should set focused', async () => {
      const ruiInput = await loader.getHarness(InputHarness);
      expect(await ruiInput.isFocused()).toBe(false);
      await ruiInput.focusInput();
      expect(await ruiInput.isFocused()).toBe(true);
    });
  });

  @Component({
    template: `
      <rui-input>
        <input [disabled]="disabled" />
      </rui-input>
    `,
    standalone: true,
    imports: [InputComponent],
  })
  class TestComponent {
    disabled = false;
  }
});
