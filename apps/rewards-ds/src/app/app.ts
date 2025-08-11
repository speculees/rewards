import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@rewards-ds/ui';

@Component({
  imports: [RouterModule, ButtonComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Rewards Design System Demo';
  protected currentTheme: 'reward' | 'natwest' = 'reward';

  switchTheme(theme: 'reward' | 'natwest') {
    this.currentTheme = theme;

    // Remove existing theme classes
    document.body.classList.remove('theme-reward', 'theme-natwest');

    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
  }

  ngOnInit() {
    // Set initial theme
    document.body.classList.add('theme-reward');
  }
}
