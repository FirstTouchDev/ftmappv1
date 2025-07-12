export class User {

     userAccountId: string;
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
     }

     static fromJson(json: any): User {
          return new User({
               userAccountId: json.userAccountId,
               firstName: json.firstName,
               middleName: json.middleName,
               lastName: json.lastName,
               gender: json.gender,
               birthDate: json.birthDate ? new Date(json.birthDate) : undefined,
               address: json.address,
               phoneNumber: json.phoneNumber,
               invitedBy: json.invitedBy,
               emailAddress: json.emailAddress,
               joinDate: json.joinDate ? new Date(json.joinDate) : undefined,
               createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
               updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
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
          };
     }
}
