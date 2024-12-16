class Customer {
    //กำหนด Attributes
    private name: string;
    private address: string;

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }
    public getInfo():string{
        return "Name:" + this.name + "\nAddress:" + this.address ;
    }
}

class Payment { 
    //กำหนด Attributes
    protected amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    public getAmount():number{
        return this.amount;
    }

}

class Order {
    //กำหนด Attributes
    private date: string;
    private status: string;
    private customer: Customer;
    private payment: Payment = new Cash(0, 0);
    private orderDetails: OrderDetail[] = [];

    constructor(date: string, status: string, customer: Customer) {
        this.date = date;
        this.status = status;
        this.customer = customer;
    }
    
    //public method
    public calcSubtotal(){
        let subtotal = 0;
        for(let i = 0; i <this.orderDetails.length;i++){
            subtotal = subtotal + this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }

    public calcTax(){
        let vat = 0;
        for(let i = 0; i <this.orderDetails.length;i++){
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }

    public printDetail():void{
        for(let i = 0; i <this.orderDetails.length;i++){
            this.orderDetails[i].printOrder();
        }
    }

    public calcTotal(){
        return this.calcSubtotal() + this.calcTax();
    }

    public calcTotalWeight(){
        let weight = 0
        for(let i = 0; i <this.orderDetails.length;i++){
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }

    public addOrderDetails(orderDetails: OrderDetail){
    this.orderDetails.push(orderDetails)
    }

    public payOrder(payment: Payment){
    this.payment=payment
    }

    public getPayment():Payment{
        return this.payment;
    }
    
}


class Cash extends Payment {
    //กำหนด Attribute
    private cashTendered: number;

    constructor(amount: number, cashTendered: number) {
        super(amount);
        this.cashTendered = cashTendered;
    }

    //public method
    public getCashTendered(): number{
        return this.cashTendered;
    }

    public getChange():number{
        return this.cashTendered - this.getAmount();
    }
}

class Check extends Payment {
    //กำหนด Attribute
    private name: string;
    private bankID: string;

    constructor(amount: number, name: string, bankID: string) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }

    //public method
    public authorized(): boolean {
        return false;
    }
}

class Credit extends Payment {
    //สร้าง Attibute
    private number: number;
    private type: string;
    private expDate: string;

    constructor(amount: number, number: number, type: string, expDate: string) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }

    //public method
    public authorized(): boolean {
        return false;
    }
}

class Item {
    //สร้าง Attibute
    private shippingWeight: number;
    private description: string;
    private price: number;

    constructor(shippingWeight: number, description: string, price:number) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }

    //public method
    public getPriceForQuantity(){
        return this.price;
    }

    public getTax(){
        return this.price * 0.07;
    }

    public getShippingWeight():number{
        return this.shippingWeight;
    }

    public inStock(){
        return true;
    }

    public getName(){
        return this.description;
    }

    public getInfo():string{
        return "Name:"+ this.description+", Price:"+this.price +" ฿, Weigth:"+this.shippingWeight+" kg.";
    }

}

class OrderDetail {
    //สร้าง Attribute
    private quantity: number;
    private taxStatus: string;
    private item: Item;


    constructor(quantity: number, taxStatus: string, item: Item) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = item;
    }

    //public method
    public calcSubTotal(): number {
        return this.quantity * this.item.getPriceForQuantity() ;
    }

    public calcWeight(): number {
        return this.quantity * this.item.getShippingWeight() ;
    }

    public calcTax(): number {
        if(this.taxStatus === "not included"){
            return this.quantity * this.item.getTax();
        }
        return 0 ;
    }
    public printOrder():void{
        console.log(this.item.getName() + "\t" + this.quantity + "(ชิ้น)\t" + this.calcSubTotal() +"฿" )
    }
}

//Create Object
const customer1 = new Customer("Choke Dee","85 Makaiman Road , Nakhon Pathom");
console.log(customer1.getInfo());
//Create Item
const item1 = new Item(1.5,"Lotus water",15);
console.log(item1.getInfo());

const item2 = new Item(0.5,"Lays",30);
console.log(item2.getInfo());

const item3 = new Item(0.10,"Mama",6);
console.log(item3.getInfo());

console.log("############################# Order #############################")


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
const cash = new Cash(amount,1000);
order1.printDetail();
order1.payOrder(cash);
console.log("SubtoTal: " + order1.calcSubtotal()+" ฿");
console.log("Vat: " + order1.calcTax()+" ฿");
console.log("Total", + order1.getPayment().getAmount()+" ฿")
console.log("Recive", + (order1.getPayment() as Cash).getCashTendered()+" ฿");
console.log("Change", + (order1.getPayment() as Cash).getChange()+" ฿");
console.log("##################################################################")