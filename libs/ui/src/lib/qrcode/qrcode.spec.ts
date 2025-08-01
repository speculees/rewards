import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import QrcodeHarness from './qrcode-harness';
import { QrcodeComponent } from './qrcode';

describe('qrcode', () => {
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
    const qrCode = await loader.getHarness(QrcodeHarness);
    expect(qrCode).toBeTruthy();
  });

  @Component({
    template: `<rui-qrcode value="test-value"></rui-qrcode>`,
    imports: [QrcodeComponent],
    standalone: true,
  })
  class TestComponent {}
});
