import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillComponent } from './pill';
import { Component } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import PillHarness from './pill-harness';

describe('pill', () => {
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

  it('should detect harness', async () => {
    const pill = await loader.getHarness(PillHarness);
    expect(pill).toBeTruthy();
  });

  it('should apply success variant', async () => {
    fixture.componentInstance.variant = 'success';

    const pill = await loader.getHarness(PillHarness);
    expect(await pill.getVariant()).toBe('success');
  });

  it('should apply error variant', async () => {
    fixture.componentInstance.variant = 'error';

    const pill = await loader.getHarness(PillHarness);
    expect(await pill.getVariant()).toBe('error');
  });

  @Component({
    template: `<rui-pill [variant]="variant"></rui-pill>`,
    imports: [PillComponent],
    standalone: true,
  })
  class TestComponent {
    variant = 'success';
  }
});
