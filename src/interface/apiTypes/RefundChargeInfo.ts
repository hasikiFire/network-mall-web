import { type RefundSubFee } from "@/interface";

export interface RefundChargeInfo {
    chargeType?: string;
    refundChargeFee?: string;
    refundSubFeeDetailList?: RefundSubFee[];
    switchFeeRate?: string;
}
