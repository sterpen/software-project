import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Transaction} from "@sp/schemas";
import { Model } from "mongoose";
import { TransactionService } from "../transaction/transaction.service";
import { Account,AccountDocument } from "src/schemas/account.schema";

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private transactionService: TransactionService
  ) {}


  /**
   * Gets all accounts in the mongo database
   * @returns all accounts in the "accounts" mongo database
   */

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  /**
   * Gets all accounts in the mongo database that has userid===userid
   * @param userid attribute in the body of accounts
   * @return all accounts in the "accounts" mongo database with userid equals the given param(userid)
   */

  async findAccounts(uid: string): Promise<Account[]> {
    return await this.accountModel.find({ userid: uid }).exec();
  }

  
  /**
   * Creates an account in the mongo database using userid with added random numbers before and 
   * after it to reduce the possiblity of duplicate values of accountid
   * @param userid for the account to be created with
   * @return the created account
   */
  
  createAccount(userid: string): Promise<Account> {
    const newId = (Math.floor(Math.random() * 50) + 1).toString();
    const newId2 = (Math.floor(Math.random() * 17) + 1).toString();
    const createdAccount = new this.accountModel({
      userid: userid,
      status: "active",
      accountid: newId + userid + newId2,
    });
    return createdAccount.save();
  }
  
  /**
   * It calculates the balance of user by adding credit and subtracting debit
   * where credit and debit are numbers that are considered boolean (1 is true and 0 is false)
   * @param accountid the id of the account you want to get the balance 
   * @return the balance of the account
   */

  async calculateBalance(accountId: string): Promise<any> {
    const transaction: Transaction[] =
      await this.transactionService.getTransaction(accountId);
    const total = transaction.reduce((acc, transaction) => {
      var value = transaction.amount
        ? transaction.amount
        : transaction.amount * -1;
      return acc + value;
    }, 0);
    return total;
  }

  /**
   * It looks for an account by providing accountid 
   * @param {accountid} aid the accountid of the account we are trying to find
   * @returns {Account|null} the account that has accountid=aid or null if no such thing exists
   */

  async findAccountbyAccountId(aid:string) :Promise<any>
  {
    return await this.accountModel.findOne({ accountid: aid }).exec();
  }


}
