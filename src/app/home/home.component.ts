import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PrimeNgFooterComponent } from '../root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { PrimeNgHeaderComponent } from '../root/shared-components/prime-ng-header/prime-ng-header.component';
import { FirebaseService } from '../root/services/firebase.service';
import { Collection } from '../root/constants/firebase';
import { tap } from 'rxjs';
import { User } from '../root/models/user.model';
import { UserAccount } from '../root/models/user-account.model';
import { DateTimePipe } from '../root/pipes/datetime.pipe';

@Component({
     selector: 'home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     standalone: true,
     imports: [
          PrimeNgHeaderComponent,
          CardModule,
          ButtonModule,
          PrimeNgFooterComponent,
     ]
})
export class HomeComponent implements OnInit {

     data: any = null;

     constructor(
          private firebaseService: FirebaseService
     ) { }

     ngOnInit() {
          this.firebaseService.adminGetData$<UserAccount>(Collection.USERACCOUNTS, 'jLqyoyabb5uJQVjRm1Gd', UserAccount.fromJson).pipe(
               tap((res: UserAccount | null) => {
                    console.log("Results: ", res);
                    this.data = res;
               })
          ).subscribe();
     }

}
