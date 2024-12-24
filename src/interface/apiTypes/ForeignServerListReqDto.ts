export interface ForeignServerListReqDto {
    pageNum?: number;
    pageSize?: number;
    fetchAll?: boolean;
    /** 0: 停止 1：活动，2：过期 */
    status?: number;
}
