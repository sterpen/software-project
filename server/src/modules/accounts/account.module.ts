import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import {AccountController} from './account.controller'
import { forwardRef } from "@nestjs/common";
import {TransactionModule} from '../transaction/transaction.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),forwardRef(() => TransactionModule)],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}