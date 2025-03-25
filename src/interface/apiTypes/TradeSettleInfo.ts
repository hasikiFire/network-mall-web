import { type TradeSettleDetail } from "@/interface";

export interface TradeSettleInfo {
    tradeSettleDetailList?: TradeSettleDetail[];
    tradeUnsettledAmount?: string;
}
