"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return "Name:" + this.name + "\nAddress:" + this.address;
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}
class Order {
    constructor(date, status, customer) {
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.date = date;
        this.status = status;
        this.customer = customer;
    }
    //public method
    calcSubtotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal = subtotal + this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    printDetail() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printOrder();
        }
    }
    calcTotal() {
        return this.calcSubtotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    addOrderDetails(orderDetails) {
        this.orderDetails.push(orderDetails);
    }
    payOrder(payment) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    //public method
    getCashTendered() {
        return this.cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
}
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    //public method
    authorized() {
        return false;
    }
}
class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    //public method
    authorized() {
        return false;
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    //public method
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 0.07;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    inStock() {
        return true;
    }
    getName() {
        return this.description;
    }
    getInfo() {
        return "Name:" + this.description + ", Price:" + this.price + " ฿, Weigth:" + this.shippingWeight + " kg.";
    }
}
class OrderDetail {
    constructor(quantity, taxStatus, item) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = item;
    }
    //public method
    calcSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === "not included") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    printOrder() {
        console.log(this.item.getName() + "\t" + this.quantity + "(ชิ้น)\t" + this.calcSubTotal() + "฿");
    }
}
//Create Object
const customer1 = new Customer("Choke Dee", "85 Makaiman Road , Nakhon Pathom");
console.log(customer1.getInfo());
//Create Item
const item1 = new Item(1.5, "Lotus water", 15);
console.log(item1.getInfo());
const item2 = new Item(0.5, "Lays", 30);
console.log(item2.getInfo());
const item3 = new Item(0.10, "Mama", 6);
console.log(item3.getInfo());
console.log("############################# Order #############################");
//Order 
const order1 = new Order("16/12/2024", "in progress", customer1);
//OrderDetail
const orderdetail1 = new OrderDetail(1, "not included", item1);
//OrderDetail
const orderdetail2 = new OrderDetail(2, "not included", item2);
//OrderDetail
const orderdetail3 = new OrderDetail(5, "not included", item3);
//OrderDetail => Order
order1.addOrderDetails(orderdetail1);
order1.addOrderDetails(orderdetail2);
order1.addOrderDetails(orderdetail3);
const amount = order1.calcTotal();
//payment
const cash = new Cash(amount, 1000);
order1.printDetail();
order1.payOrder(cash);
console.log("SubtoTal: " + order1.calcSubtotal() + " ฿");
console.log("Vat: " + order1.calcTax() + " ฿");
console.log("Total", +order1.getPayment().getAmount() + " ฿");
console.log("Recive", +order1.getPayment().getCashTendered() + " ฿");
console.log("Change", +order1.getPayment().getChange() + " ฿");
console.log("##################################################################");
