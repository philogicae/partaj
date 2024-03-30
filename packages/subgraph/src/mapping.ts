import { log, BigInt } from '@graphprotocol/graph-ts';
import { ERC721, Transfer as TransferEvent, Publish as PublishEvent, Cancel as CancelEvent } from '../generated/Partaj/Partaj';
import { Transfer, Token, Owner, Contract, Publish, Cancel, Publication, Cancellation } from '../generated/schema';

export function handleTransfer(event: TransferEvent): void {
  log.debug('Transfer detected. From: {} | To: {} | TokenID: {}', [
    event.params.from.toHexString(),
    event.params.to.toHexString(),
    event.params.tokenId.toHexString(),
   ]);

  let previousOwner = Owner.load(event.params.from.toHexString());
  let newOwner = Owner.load(event.params.to.toHexString());
  let token = Token.load(event.params.tokenId.toHexString());
  let transferId = event.transaction.hash
    .toHexString()
    .concat(':'.concat(event.transactionLogIndex.toHexString()));
  let transfer = Transfer.load(transferId);
  let contract = Contract.load(event.address.toHexString());
  let instance = ERC721.bind(event.address);

  if (previousOwner == null) {
    previousOwner = new Owner(event.params.from.toHexString());

    previousOwner.balance = BigInt.fromI32(0);
  } else {
    let prevBalance = previousOwner.balance;
    if (prevBalance > BigInt.fromI32(0)) {
      previousOwner.balance = prevBalance - BigInt.fromI32(1);
    }
  }

  if (newOwner == null) {
    newOwner = new Owner(event.params.to.toHexString());
    newOwner.balance = BigInt.fromI32(1);
  } else {
    let prevBalance = newOwner.balance;
    newOwner.balance = prevBalance + BigInt.fromI32(1);
  }

  if (token == null) {
    token = new Token(event.params.tokenId.toHexString());
    token.contract = event.address.toHexString();

    let uri = instance.try_tokenURI(event.params.tokenId);
    if (!uri.reverted) {
      token.uri = uri.value;
    }
  }

  token.owner = event.params.to.toHexString();

  if (transfer == null) {
    transfer = new Transfer(transferId);
    transfer.token = event.params.tokenId.toHexString();
    transfer.from = event.params.from.toHexString();
    transfer.to = event.params.to.toHexString();
    transfer.timestamp = event.block.timestamp;
    transfer.block = event.block.number;
    transfer.transactionHash = event.transaction.hash.toHexString();
  }

  if (contract == null) {
    contract = new Contract(event.address.toHexString());
  }

  let name = instance.try_name();
  if (!name.reverted) {
    contract.name = name.value;
  }

  let symbol = instance.try_symbol();
  if (!symbol.reverted) {
    contract.symbol = symbol.value;
  }

  let totalSupply = instance.try_totalSupply();
  if (!totalSupply.reverted) {
    contract.totalSupply = totalSupply.value;
  }

  previousOwner.save();
  newOwner.save();
  token.save();
  contract.save();
  transfer.save();

}

export function handlePublish(event: PublishEvent): void {
  log.debug('Publish detected. Owner: {} | TokenID: {} | Ref: {}', [
    event.params.owner.toHexString(),
    event.params.tokenId.toHexString(),
    event.params.ref.toHexString(),
    ]);

  let publish = new Publication(event.transaction.hash.toHexString());
  publish.token = Token.load(event.params.tokenId.toHexString());
  publish.publisher = Owner.load(event.params.owner.toHexString());
  publish.timestamp = event.block.timestamp;
  publish.save();
}

export function handleCancel(event: CancelEvent): void {
  log.debug('Cancel detected. TokenID: {}', [
    event.params.tokenId.toHexString(),
    ]);

  let cancel = new Cancellation(event.transaction.hash.toHexString());
  cancel.token = Token.load(event.params.tokenId.toHexString());
  cancel.canceller = Owner.load(event.params.owner.toHexString()); // assuming owner is the one who cancels the publication
  cancel.timestamp = event.block.timestamp;
  cancel.save();
}