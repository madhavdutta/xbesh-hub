export type AuthProvider = {
    id: string;
    name: string;
};

export type Client = {
        identity: string;
        password: string;
};
export type Account ={
    id: string;
    email: string;
    emailVerified: Date | null;
};

export type User = {
    id?: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    emailVisibility: boolean;
    isTermsAccepted: boolean;
    isEmailVerified: boolean;
    invitedBy: string;
    providerAccountId: string;
    provider: string;
    sessionToken: string;
    userId: string;
    expires: string;
    identifier: string;
    token: string;
};

export type xBeshClientType = {
    createUser : (user: Omit<Account, "id">) => Promise<Record | ClientResponseError>;
    getUser : (id:string) => Promise<Record | ClientResponseError>;
    getUserByEmail : ({email}: string) => Promise<Record | ClientResponseError>;
    getUserByAccount : (providerAccountId: string, provider: string) => Promise<Record | ClientResponseError>;
    updateUser : (user: Partial<AdapterUser>) => Promise<Record | ClientResponseError>;
    deleteUser : (userId: string) => Promise<Record | ClientResponseError>;
    linkAccount : (account: AdapterAccount) => Promise<Record | ClientResponseError>;
    unlinkAccount : ({ providerAccountId, provider }: Pick<AdapterAccount, "provider" | "providerAccountId">) => Promise<Record | ClientResponseError>;
    createSession : (sessionToken: string, userId: string, expires: Date) => Promise<any>;
    getSessionAndUser : (sessionToken: string) => Promise<Record | ClientResponseError>;
    updateSession : ({ sessionToken }: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">) => Promise<Record | ClientResponseError>;
    deleteSession : (sessionToken:string) => Promise<Record | ClientResponseError>;
    createVerificationToken : ({ identifier, expires, token }: VerificationToken) => Promise<Record | ClientResponseError>;
    useVerificationToken : ({ identifier, token }: {identifier: string;token: string;}) => Promise<Record | ClientResponseError>;
    getUserByCredentials : (email: string, password: string) => Record | Admin | null;
};