export class Collection {
     static readonly USERS = 'users';
     static readonly USERACCOUNTS = 'userAccounts';
}

export class Field {
     static readonly USERNAME = 'username';
     static readonly PASSWORD = 'password';
     static readonly ROLES = 'roles';
     static readonly USERACCOUNTID = 'userAccountId';
}

export class Operators {
     static readonly ISEQUALTO = '==';
     static readonly ARRAYCONTAINS = 'array-contains';
}

export class ApprovalStatus {
     static readonly WATINGFORAPPROVAL = 'waiting_for_approval';
     static readonly APPROVED = 'approved';
}