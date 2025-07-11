export class User {

     id?: string;
     name: string;
     email: string;
     createdAt: Date;
     updatedAt: Date;

     constructor(data: Partial<User> = {}) {
          this.id = data.id;
          this.name = data.name || '';
          this.email = data.email || '';
          this.createdAt = new Date()
          this.updatedAt = new Date()
     }
}

export class UserAccounts {
     
     username: string;
     password: string;
     isSuperUser: boolean;
     createdAt: Date;
     updatedAt: Date;

     constructor(data: Partial<UserAccounts> = {}) {
          this.username = data.username || '';
          this.password = data.password || '';
          this.isSuperUser = data.isSuperUser ?? false;
          this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
          this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
     }

     static fromJson(json: any): UserAccounts {
          return new UserAccounts({
               username: json.username,
               password: json.password,
               isSuperUser: json.isSuperUser,
               createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
               updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
          });
     }

     toJson(): object {
          return {
               username: this.username,
               password: this.password,
               isSuperUser: this.isSuperUser,
               createdAt: this.createdAt,
               updatedAt: this.updatedAt,
          };
     }
}
