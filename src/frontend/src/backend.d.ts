import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    password: string;
    name: string;
    email: string;
}
export interface Transaction {
    transactionType: TransactionType;
    description: string;
    timestamp: bigint;
    amount: bigint;
}
export enum TransactionType {
    deposit = "deposit",
    withdrawal = "withdrawal",
    transfer = "transfer"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deposit(amount: bigint, description: string): Promise<void>;
    getBalance(): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTransactions(): Promise<Array<Transaction>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAccount(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    transfer(to: Principal, amount: bigint, description: string): Promise<void>;
    updatePassword(currentPassword: string, newPassword: string): Promise<void>;
    withdraw(amount: bigint, description: string): Promise<void>;
}
