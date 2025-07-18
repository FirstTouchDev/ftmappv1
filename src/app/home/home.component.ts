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
          CardModule,
          ButtonModule,
          DateTimePipe
     ]
})
export class HomeComponent implements OnInit {

     public data: UserAccount = new UserAccount();

     constructor(
          private firebaseService: FirebaseService,
     ) { }

     ngOnInit() {
          this.firebaseService.adminGetSingleData$<UserAccount>(Collection.USERACCOUNTS, 'UA3Y2h80e8Fg4ocmBFKu').pipe(
               tap((res: UserAccount | null) => {
                    if (res){
                         this.data = UserAccount.fromJson(res);
                    }
               })
          ).subscribe();
     }

     ngAfterViewInit() {
     }

}
