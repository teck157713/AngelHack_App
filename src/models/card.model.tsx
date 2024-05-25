export interface ICard {
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string
}

export interface ICardResponse {
    last4: string,
    expiryMonth: string,
    expiryYear: string
}
