interface IProductListModel {
	title: string;
	showImage: boolean;
	products: app.domain.IProduct[];
	toggleImage(): void;
}

class ProductListCtrl implements IProductListModel {
	title: string;
	showImage: boolean;
	products: app.domain.IProduct[];

	constructor(private dataAccessService: app.common.DataAccessService) {
		static $inject =["dataAccessService"];
		this.title = "Product List";
		this.showImage = false;
		this.products = dataAccessService.getProductResource();
		productResource.query((data: app.domain.IProduct[]) => {
			this.products = data;
		})

		var newProduct = new app.domain.IProduct(3,"Unicorn shirt","TBS-113", new Date(2017,2,1),
												12.99,"A unicorn printed shirt",
												"https://images.lookhuman.com/render/standard/0008607496664702/6710-heathered_blue_nl-z1-t-too-legit-to-exist-unicorn.png")

		newProduct.price = newProduct.calculateDiscount(10);
		this.products.push(newProduct);
	}

	toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
angular
	.module("productManagement")
	.controller("ProductListCtrl",
		ProductListCtrl);