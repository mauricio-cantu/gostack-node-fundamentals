import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // using filter, map and reduce
    // const getTotal = (type: string): number =>
    //   this.transactions
    //     .filter(transaction => transaction.type === type)
    //     .map(transaction => transaction.value)
    //     .reduce((total, current) => total + current, 0);

    // using reduce only
    const getTotal = (type: string): number =>
      this.transactions.reduce((total, current) => {
        if (current.type === type) return total + current.value;
        return total;
      }, 0);

    const income = getTotal('income');
    const outcome = getTotal('outcome');
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
