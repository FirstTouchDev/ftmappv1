export class Collection {
     static readonly USERS = 'users';
     static readonly LINEUPS = 'lineUps';
     static readonly USERACCOUNTS = 'userAccounts';
}

export class Field {
     static readonly USERNAME = 'username';
     static readonly PASSWORD = 'password';
     static readonly ROLES = 'roles';
     static readonly USERACCOUNTID = 'userAccountId';
     static readonly CREATEDBY = 'createdBy';
     static readonly ID = 'id';
}

export class Roles {
     static readonly SINGER = 'singer';
     static readonly KEYBOARDIST = 'keyboardist';
     static readonly GUITARIST = 'guitarist';
     static readonly DRUMMER = 'drummer';
     static readonly BASSIST = 'bassist';
}

export class Operators {
     static readonly ISEQUALTO = '==';
     static readonly ARRAYCONTAINS = 'array-contains';
}

export class ApprovalStatus {
     static readonly WATINGFORAPPROVAL = 'Waiting for approval';
     static readonly APPROVED = 'Approved';
}

