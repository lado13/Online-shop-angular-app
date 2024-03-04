import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {

  constructor() { }

  private readonly darkModeKey = 'darkMode';

  ngOnInit(): void {
    this.initializeDarkMode();
  }

  private initializeDarkMode() {
    const isDarkMode = this.isDarkModePreferred();
    this.setDarkMode(isDarkMode);
  }

  toggleDarkMode() {
    const isDarkMode = this.isDarkModePreferred();
    this.setDarkMode(!isDarkMode);
  }

  private isDarkModePreferred(): boolean {
    return JSON.parse(localStorage.getItem(this.darkModeKey) || 'false');
  }

  private setDarkMode(isDarkMode: boolean) {
    localStorage.setItem(this.darkModeKey, JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }







}
