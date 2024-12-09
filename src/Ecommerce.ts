class Customer{
    //กำหนด Attributes
    private name: string;
    private address: string;

    constructor(name:string,address:string){
        this.name = name;
        this.address = address;
    }
}

class Payment {
    //กำหนด Attributes
    private amount: number;

    constructor(amount:number){
        this.amount = amount;
    }
}

class Order {
    //กำหนด Attributes
    private date: string;
    private status: string;

    constructor(date:string,status:string){
        this.date = date;
        this.status = status;
    }
    
    //public method
    public getSubTotal():number{
        return 0 ;
    }
    public getTax():number{
        return 0 ;
    }
    public getTotal():number{
        return 0 ;
    }
    public getTotalWeight():number{
        return 0 ;
    }
}

class Cash extends Payment {
    //กำหนด Attribute
    private cashTendered;

    constructor(amount:number,cashTendered: number){
        super(amount);
        this.cashTendered = cashTendered;
    }
}

class Check extends Payment {
    //กำหนด Attribute
    private name: string;
    private bankID: string;

    constructor(amount:number,name:string,bankID:string){
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }

    //public method
    public authorized():boolean{
        return false ;
    }
}

class Credit extends Payment{
    //สร้าง Attibute
    private number: number;
    private type: string;
    private expDate: string;

    constructor(amount:number,number:number,type:string,expDate:string){
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    //public method
    public authorized():boolean{
        return false;
    }
}

class Item{ 
    //สร้าง Attibute
    private shippingWeight: number;
    private description: string;
    
    constructor(shippingWeight:number,description: string){
        this.shippingWeight = shippingWeight;
        this.description = description;
    }

    //public method
    public getPriceForQuantity():number{
        return 0 ;
    }
    public getTax():number{
        return 0 ;
    }
    public getStock():number{
        return 0 ;
    }
}

class OrderDetail{
    //สร้าง Attribute
    private quantity: number;
    private taxStatus: string;

    constructor(quantity:number,taxStatus:string){
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }

    //public method
    public calcSubTotal():number{
        return 0 ;
    }
    public calcWeight():number{
        return 0 ;
    }
    public calcTax():number{
        return 0 ;
    }
}