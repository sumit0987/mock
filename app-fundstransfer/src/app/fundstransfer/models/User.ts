/**
 * model created for a user/account record
 */
export interface User {
    userName: string,
    firstName: string,
    lastName: string,
    userMobile: string,
    userAddress: string,
    userEmail: string,
    accountNumber: string,
    accountBalance: number,
    accountStatus: string,
    accountType: string,
    id: number
}