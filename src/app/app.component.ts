import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from "./header/header.component";
import { ContextComponent } from "./context/context.component";
import { FooterComponent } from "./footer/footer.component";





@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, ContextComponent, FooterComponent,]
})
export class AppComponent {
  title = 'angular-app';
}
