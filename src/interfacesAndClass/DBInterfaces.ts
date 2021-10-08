export class User {
    id?: number;
    facebookId?: string;
    googleId?: string;
    email: string;
    firstName: string;
    lastName?: string;
    documentId: string;
    documentType: string;
    phoneNumber?: string;
    role?: string;
}

export interface FinancialInfo {
    userId?:            number;
    income:            number;
    consuption:        number;
    bankConsignements: number;
    assetsValue:       number;
    liabilitiesValue:  number;
}
