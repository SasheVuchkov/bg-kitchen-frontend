import {RxCollection, RxDatabase, RxDocument} from 'rxdb/src/types';

export type Address = {
    country: string,
    city: string,
    details: string,
    phone?: string,
}

export type Person = {
    name: string;
    vat?: string;
    tax_id: string;
    address: Address;
    mol: string;
    type: 'company' | 'customer',
    id?: string,
    created_at?: string,
    updated_at?: string,
};

export type InvoiceArticle = {
    name: string;
    id?: string;
    unit: string;
    price: number;
    rawPrice?: string;
    created_at?: string;
    updated_at?: string;
}

export type PaymentMethod = {
    id: number,
    name: string,
    bank_iban: string,
    bank_name: string,
    bank_code: string,
}

export type InvoiceMeta  = {
    type: number,
    doc_date: string,
    doc_due_date: string,
    event_date: string,
    doc_number: string,
    doc_receiver: string,
    doc_author: string,
    doc_info: string,
    vat_reason: string,
}

export type InvoiceState = InvoiceMeta & {
    partner: Person;
    company: Person;
    applyVat: boolean;
    payment_method: PaymentMethod,
}

export type Totals = {
    base: number,
    vat: number,
    total: number,
}

export enum Steps {
    ITEMS = 0,
    PARTNER = 1,
    COMPANY = 2,
    PAYMENT = 3,
    METADATA = 4,
    INFO = 5,
    PREVIEW = 6,
}

export type Request<T> = {
    id: string,
    action: string,
    data: T,
}

export type Response<T> = {
    id: string,
    action: string,
    body: T,
}


export type PersonDocumentMethods = {
}

export type PersonDocument = RxDocument<Person>;

export type PersonCollectionMethods = {
    count: () => Promise<number>
}

export type PersonCollection = RxCollection<PersonDocument, PersonDocumentMethods, PersonCollectionMethods>;

export type DatabaseCollections  = {
    person: PersonCollection,
}

export type Database = RxDatabase<DatabaseCollections>;

export type PersonType = 'customer' | 'company';