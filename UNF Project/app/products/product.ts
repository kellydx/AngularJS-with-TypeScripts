module app.domain {
    interface IProduct{
        productId: number;
        productName: string;
        productCode: string;
        releaseDta: Date;
        price: number;
        description: string;
        imageUrl: string;
        calculateDiscount (percent: number): number;
    }

    class Product implements IProduct{
        constructor( public productId: number,
                    public productName: string,
                    public productCode: string,
                    public releaseDta: Date,
                    public price: number,
                    public description: string,
                    public imageUrl: string) {

        }
        calculateDiscount(percent: number): number {
            return this.price - (this.price*percent*100);
        }
    }
}