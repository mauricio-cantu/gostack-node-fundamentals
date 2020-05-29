import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total < value
    ) {
      throw Error(
        'There is no enough balance to perform this outcome transaction.',
      );
    }

    const transaction = this.transactionsRepository.create({
      value,
      type,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
