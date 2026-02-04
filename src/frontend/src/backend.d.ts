import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Pricing {
    controller: bigint;
    console: bigint;
    game: bigint;
}
export interface RentalInquiry {
    durationDays: bigint;
    totalCost: bigint;
    timestamp: Time;
    itemType: ItemType;
    quantity: bigint;
    startDate: Time;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export enum ItemType {
    controller = "controller",
    console_ = "console",
    game = "game"
}
export interface backendInterface {
    calculateRentalCost(itemType: ItemType, quantity: bigint, durationDays: bigint): Promise<bigint>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getPricing(): Promise<Pricing>;
    getRentalInquiries(): Promise<Array<RentalInquiry>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    submitRentalInquiry(itemType: ItemType, quantity: bigint, startDate: Time, durationDays: bigint): Promise<bigint>;
    updatePricing(consoleRate: bigint, gameRate: bigint, controllerRate: bigint): Promise<void>;
}
