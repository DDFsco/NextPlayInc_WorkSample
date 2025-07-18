export class TransactionData {
    id: number;            // Transaction ID (Primary Key)
    date: Date;            // Date of the transaction
    product: string;       // Product involved in the transaction
    category?: string;     // Optional: Category of the transaction
    currency: string;      // Currency of the transaction
    user_id: number;       // User ID (foreign key)
    amount: number;        // Amount of the transaction
    description?: string;  // Optional: Description of the transaction
  
  
    constructor(id: number, date: Date, product: string, currency: string, user_id: number, amount: number, category?: string, description?: string) {
      this.id = id;
      this.date = date;
      this.product = product;
      this.category = category;
      this.currency = currency;
      this.user_id = user_id;
      this.amount = amount;
      this.description = description;
    }
  
  }
  
  export class DepositMethodData {
    user_id: number;
    method_name: string;       // Name of the deposit method (e.g., PayPal, Credit Card)
    is_enabled: boolean;       // Whether the deposit method is enabled or disabled
  
  
    constructor(user_id: number, method_name: string, is_enabled: boolean) {
      this.user_id = user_id;
      this.method_name = method_name;
      this.is_enabled = is_enabled;
    }
  
  }