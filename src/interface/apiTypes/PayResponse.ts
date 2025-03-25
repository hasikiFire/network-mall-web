export interface PayResponse {
    orderNo?: string;
    amount?: number;
    paymentType?: string;
    status?: string;
    payUrl?: string;
    expireTime?: string;
    data?: any;
}
