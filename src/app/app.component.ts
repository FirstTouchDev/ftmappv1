import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';


@Component({
     selector: 'app-root',
     imports: [RouterOutlet, ToastModule, MessageModule],
     templateUrl: './app.component.html',
     styleUrl: './app.component.css',
     standalone: true,
     providers: [MessageService]
})
export class AppComponent {
     title = 'ftmapp';

     constructor(){
          
     }
}
