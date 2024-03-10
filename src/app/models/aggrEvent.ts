// Interface for final output: Table Data 
export interface AggrEvent {
    ViewCount: number;
    AddToCartCount: number;
    PurchaseCount: number;
    DateTime: Date;
    ItemID: string;
    ItemName: string;
}