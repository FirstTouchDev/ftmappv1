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
     static readonly WATINGFORAPPROVAL = 'waiting_for_approval';
     static readonly APPROVED = 'approved';
}

