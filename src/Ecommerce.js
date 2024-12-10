var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Customer = /** @class */ (function () {
    function Customer(name, address) {
        this.name = name;
        this.address = address;
    }
    return Customer;
}());
var Payment = /** @class */ (function () {
    function Payment(amount) {
        this.amount = amount;
    }
    return Payment;
}());
var Order = /** @class */ (function () {
    function Order(date, status, customer) {
        this.payment = new Cash(0, 0);
        this.date = date;
        this.status = status;
        this.customer = customer;
    }
    //public method
    Order.prototype.getSubTotal = function () {
        return 0;
    };
    Order.prototype.getTax = function () {
        return 0;
    };
    Order.prototype.getTotal = function () {
        return 0;
    };
    Order.prototype.getTotalWeight = function () {
        return 0;
    };
    Order.prototype.pay = function (amount, cashTendered) {
        this.payment.amount = amount;
        this.payment.calcSubTotal = cashTendered;
    };
    return Order;
}());
var Cash = /** @class */ (function (_super) {
    __extends(Cash, _super);
    function Cash(amount, cashTendered) {
        var _this = _super.call(this, amount) || this;
        _this.cashTendered = cashTendered;
        return _this;
    }
    return Cash;
}(Payment));
var Check = /** @class */ (function (_super) {
    __extends(Check, _super);
    function Check(amount, name, bankID) {
        var _this = _super.call(this, amount) || this;
        _this.name = name;
        _this.bankID = bankID;
        return _this;
    }
    //public method
    Check.prototype.authorized = function () {
        return false;
    };
    return Check;
}(Payment));
var Credit = /** @class */ (function (_super) {
    __extends(Credit, _super);
    function Credit(amount, number, type, expDate) {
        var _this = _super.call(this, amount) || this;
        _this.number = number;
        _this.type = type;
        _this.expDate = expDate;
        return _this;
    }
    //public method
    Credit.prototype.authorized = function () {
        return false;
    };
    return Credit;
}(Payment));
var Item = /** @class */ (function () {
    function Item(shippingWeight, description) {
        this.shippingWeight = shippingWeight;
        this.description = description;
    }
    //public method
    Item.prototype.getPriceForQuantity = function () {
        return 0;
    };
    Item.prototype.getTax = function () {
        return 0;
    };
    Item.prototype.getStock = function () {
        return 0;
    };
    return Item;
}());
var OrderDetail = /** @class */ (function () {
    function OrderDetail(quantity, taxStatus, item) {
        this.item = Item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = Item;
    }
    //public method
    OrderDetail.prototype.calcSubTotal = function () {
        return 0;
    };
    OrderDetail.prototype.calcWeight = function () {
        return 0;
    };
    OrderDetail.prototype.calcTax = function () {
        return 0;
    };
    return OrderDetail;
}());
