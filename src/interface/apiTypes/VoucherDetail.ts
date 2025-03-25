import { type ContributeDetail } from "@/interface";

export interface VoucherDetail {
    amount?: string;
    id?: string;
    memo?: string;
    merchantContribute?: string;
    name?: string;
    otherContribute?: string;
    otherContributeDetail?: ContributeDetail[];
    purchaseAntContribute?: string;
    purchaseBuyerContribute?: string;
    purchaseMerchantContribute?: string;
    templateId?: string;
    type?: string;
}
