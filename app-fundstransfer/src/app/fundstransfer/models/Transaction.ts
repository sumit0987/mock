/**
 * model created for a transaction record
 */
export interface Transaction {
    transactionDate: string,
    from: string,
    to: string,
    transactionType: string,
    transactionAmount: number,
    id: number
}