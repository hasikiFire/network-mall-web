import { type SubFee } from "@/interface";

export interface ChargeInfo {
    chargeFee?: string;
    chargeType?: string;
    isRatingOnSwitch?: string;
    isRatingOnTradeReceiver?: string;
    originalChargeFee?: string;
    subFeeDetailList?: SubFee[];
    switchFeeRate?: string;
}
