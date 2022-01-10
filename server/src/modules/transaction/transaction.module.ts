import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionController } from "./transactions.controller";
import { Transaction, TransactionSchema } from "@sp/schemas";
import { TransactionService } from "./transaction.service"; 
import { AccountModule } from "../accounts/account.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name:Transaction.name, schema: TransactionSchema }]),AccountModule],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}


