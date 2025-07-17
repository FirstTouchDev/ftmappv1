import { ApprovalStatus } from "../constants/firebase";
import { Timestamp } from "firebase/firestore";
export class UserAccount {

     username: string;
     password: string;
     recoveryEmail: string;
     isSuperUser: boolean;
     status: string;
     createdAt: Date;
     updatedAt: Date;


     constructor(data: Partial<UserAccount> = {}) {
          this.username = data.username || '';
          this.password = data.password || '';
          this.recoveryEmail = data.recoveryEmail || '';
          this.isSuperUser = data.isSuperUser ?? false;
          this.status = data.status || ApprovalStatus.WATINGFORAPPROVAL;
          this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
          this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
     }

     static fromJson(json: any): UserAccount {
          return new UserAccount({
               username: json.username,
               password: json.password,
               recoveryEmail: json.recoveryEmail,
               isSuperUser: json.isSuperUser,
               status: json.status,
               createdAt: json.createdAt instanceof Timestamp ? json.createdAt.toDate() : new Date(json.createdAt),
               updatedAt: json.updatedAt instanceof Timestamp ? json.updatedAt.toDate() : new Date(json.updatedAt),
          });
     }

     toJson(): object {
          return {
               username: this.username,
               password: this.password,
               recoveryEmail: this.recoveryEmail,
               isSuperUser: this.isSuperUser,
               status: this.status,
               createdAt: this.createdAt,
               updatedAt: this.updatedAt,
          };
     }
}