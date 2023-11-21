class TicketDTO {
    constructor(name, description, code, purchase_datetime, amount, purchaser) {
      this.name = name;
      this.description = description;
      this.code = code;
      this.purchase_datetime = purchase_datetime;
      this.amount = amount;
      this.purchaser = purchaser;
    }
  }
  
  export default TicketDTO;
  