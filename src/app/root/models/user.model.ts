import { Timestamp } from "firebase/firestore";

export class User {

     userAccountId: string;
     id?: string;
     firstName: string;
     middleName?: string;
     lastName: string;
     gender: string;
     birthDate: Date;
     address: string;
     phoneNumber?: string;
     invitedBy?: string;
     emailAddress: string;
     joinDate?: Date;
     createdAt: Date;
     updatedAt: Date;
     firstLastName?: string;
     fullName?: string;
     roles: string[]

     constructor(data: Partial<User> = {}) {
          this.userAccountId = data.userAccountId || '';
          this.firstName = data.firstName || '';
          this.middleName = data.middleName || '';
          this.lastName = data.lastName || '';
          this.gender = data.gender || '';
          this.birthDate = data.birthDate ? new Date(data.birthDate) : new Date();
          this.address = data.address || '';
          this.phoneNumber = data.phoneNumber || '';
          this.invitedBy = data.invitedBy || '';
          this.emailAddress = data.emailAddress || '';
          this.joinDate = data.joinDate ? new Date(data.joinDate) : new Date();
          this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
          this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
          this.firstLastName = data.firstName + " " + data.lastName;
          this.fullName = data.firstName + " " + data.middleName + " " + data.lastName;
          this.roles = data.roles || [];
     }

     static fromJson(json: any): User {
          return new User({
               userAccountId: json.userAccountId,
               firstName: json.firstName,
               middleName: json.middleName,
               lastName: json.lastName,
               gender: json.gender,
               birthDate: json.birthDate instanceof Timestamp ? json.birthDate.toDate() : new Date(json.birthDate),
               address: json.address,
               phoneNumber: json.phoneNumber,
               invitedBy: json.invitedBy,
               emailAddress: json.emailAddress,
               joinDate: json.joinDate instanceof Timestamp ? json.joinDate.toDate() : new Date(json.joinDate),
               createdAt: json.createdAt instanceof Timestamp ? json.createdAt.toDate() : new Date(json.createdAt),
               updatedAt: json.updatedAt instanceof Timestamp ? json.updatedAt.toDate() : new Date(json.updatedAt),
               firstLastName: json.firstLastName,
               fullName: json.fullName,
               roles: json.roles || [],
          });
     }

     toJson(): object {
          return {
               userAccountId: this.userAccountId,
               firstName: this.firstName,
               middleName: this.middleName,
               lastName: this.lastName,
               gender: this.gender,
               birthDate: this.birthDate,
               address: this.address,
               phoneNumber: this.phoneNumber,
               invitedBy: this.invitedBy,
               emailAddress: this.emailAddress,
               joinDate: this.joinDate,
               createdAt: this.createdAt,
               updatedAt: this.updatedAt,
               firstLastName: this.firstLastName,
               fullName: this.fullName,
               roles: this.roles,
          };
     }

     static createAllOption(): User {
          return new User({
               userAccountId: 'all',
               firstName: 'All',
               lastName: '',
               gender: 'N/A',
               birthDate: new Date(),
               address: '',
               emailAddress: '',
               createdAt: new Date(),
               updatedAt: new Date(),
               roles: [],
               firstLastName: 'All',
          });
     }
}
