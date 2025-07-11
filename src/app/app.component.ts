import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@Component({
     selector: 'app-root',
     imports: [RouterOutlet],
     templateUrl: './app.component.html',
     styleUrl: './app.component.css'
})
export class AppComponent {
     title = 'ftmapp';
}
