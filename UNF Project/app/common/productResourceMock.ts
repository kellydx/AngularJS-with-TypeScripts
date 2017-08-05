module app.common {

    var mockResource = angular
        .module("productResourceMock",
            ["ngMockE2E"]);

    mockResource.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"];
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
        var products: app.domain.IProduct[] = [];
        var product: app.domain.IProduct;

        this.products = [
           {
				"productId": 1,
				"productName": "Unicorn Slippers",
				"productCode": "GDN-0011",
				"releaseDate": new Date(2009, 2, 19),
				"description": "Cast a light for nighttime mischief in these light-up slippers.",
				"price": 19.95,
				"imageUrl": "https://img.buzzfeed.com/buzzfeed-static/static/2016-10/26/16/asset/buzzfeed-prod-fastlane02/sub-buzz-10442-1477514127-7.jpg?crop=913:743;0,437&downsize=715:*&output-format=auto&output-quality=auto"
			},
			{
				"productId": 2,
				"productName": "Unicorn Rubber Duck",
				"productCode": "GDN-0023",
				"releaseDate": new Date(2010, 2, 18),
				"description": "Find a bath buddy with a unicorn rubber ducky",
				"price": 32.99,
				"imageUrl": "https://img.buzzfeed.com/buzzfeed-static/static/2016-10/27/11/asset/buzzfeed-prod-fastlane01/sub-buzz-21528-1477583800-2.jpg?downsize=715:*&output-format=auto&output-quality=auto"
			},
			{
				"productId": 5,
				"productName": "Unicorn Inflatable Horn",
				"productCode": "TBX-0048",
				"releaseDate": new Date(2013, 4, 21),
				"description": "Let the cat cosplay with an inflatable horn.",
				"price": 8.99,
				"imageUrl": "http://ct.weirdnutdaily.com/ol/wn/sw/i55/2/3/20/wnd_39a28fa05d0c96730806f833a88e67b1.jpg"
			},
			{
				"productId": 5,
				"productName": "Unicorn Canned Meat",
				"productCode": "TBX-0048",
				"releaseDate": new Date(2013, 4, 21),
				"description": "The perfect gift for a misbehaving daughter.",
				"price": 8.99,
				"imageUrl": "http://www.awesomewasteofmoney.com/wp-content/uploads/2012/03/unicorn.jpg"
			},
			{
				"productId": 5,
				"productName": "Unicorn Phone Case",
				"productCode": "TBX-0048",
				"releaseDate": new Date(2013, 4, 21),
				"description": "Yeah they do!  Because everyone knows…Unicorns just get it.",
				"price": 8.99,
				"imageUrl": "http://3i1e5d437yd84efcy34dardm.wpengine.netdna-cdn.com/wp-content/uploads/2017/05/unicorn-iphone-case.jpg"
			},
			{
				"productId": 5,
				"productName": "Caticorn Magic Mug",
				"productCode": "TBX-0048",
				"releaseDate": new Date(2013, 4, 21),
				"description": "Combine your love for cat and unicorn together",
				"price": 8.99,
				"imageUrl": "https://images.lookhuman.com/render/standard/0269000206609050/mug15oz-whi-z1-t-caticorn-magic.png"
			},
			{
				"productId": 5,
				"productName": "Unicorn Inflatable Horn",
				"productCode": "TBX-0048",
				"releaseDate": new Date(2013, 4, 21),
				"description": "Let the cat cosplay with an inflatable horn",
				"price": 8.99,
				"imageUrl": "http://ct.weirdnutdaily.com/ol/wn/sw/i55/2/3/20/wnd_39a28fa05d0c96730806f833a88e67b1.jpg"
			}
        ];
        products.push(product);

        var productUrl = "/api/products";

        $httpBackend.whenGET(productUrl).respond(products);

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            var product = { "productId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                }
            }
            return [200, product, {}];
        });

        // Catch all for testing purposes
        $httpBackend.whenGET(/api/).respond(function(method, url, data) {
            return [200, products, {}];
        });
                
        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    }
}