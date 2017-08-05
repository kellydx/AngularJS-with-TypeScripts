var ProductListCtrl = (function () {
    function ProductListCtrl() {
        this.title = "Product List";
        this.showImage = false;
       
    }
    ProductListCtrl.prototype.toggleImage = function () {
        this.showImage = !this.showImage;
    };
    return ProductListCtrl;
})();
angular
    .module("productManagement")
    .controller("ProductListCtrl", ProductListCtrl);
