
export interface CreateUser {
    idGoogle:     string;
    email:        string;
    firstName?:    string;
    lastName?:     string;
    documentId?:   string;
    documentType?: string;
    phoneNumber?:  string;
}
