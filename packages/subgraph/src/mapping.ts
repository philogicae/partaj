import { log, BigInt } from "@graphprotocol/graph-ts";
import { Partaj, Transfer as TransferEvent, PublishEvent, CancelEvent } from "../generated/Partaj/Partaj";
import { Transfer, Token, Owner, Contract } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  log.debug("Transfer detected. From: {} | To: {} | TokenID: {}", [
    event.params.from.toHexString(),
    event.params.to.toHexString(),
    event.params.tokenId.toHexString(),
  ]);

  let previousOwner = Owner.load(event.params.from.toHexString());
  let newOwner = Owner.load(event.params.to.toHexString());
  let token = Token.load(event.params.tokenId.toHexString());
  let transferId = event.transaction.hash
    .toHexString()
    .concat(":".concat(event.transactionLogIndex.toHexString()));
  let transfer = Transfer.load(transferId);
  let contract = Contract.load(event.address.toHexString());
  let instance = Partaj.bind(event.address);

  if (previousOwner == null) {
    previousOwner = new Owner(event.params.from.toHexString());

    previousOwner.balance = BigInt.fromI32(0);
  } else {
    let prevBalance = previousOwner.balance;
    if (prevBalance > BigInt.fromI32(0)) {
      previousOwner.balance = prevBalance - Number(BigInt.fromI32(1));
    }
  }

  if (newOwner == null) {
    newOwner = new Owner(event.params.to.toHexString());
    newOwner.balance = BigInt.fromI32(1);
  } else {
    let prevBalance = newOwner.balance;
    newOwner.balance = prevBalance + BigInt.fromI32(1);
  }

  if (!token) {
    token = new Token(event.params.tokenId.toHexString());
    token.contract = event.address.toHexString();

    let uri = instance.try_tokenURI(event.params.tokenId);
    if (!uri.reverted) {
      token.uri = uri.value;
    }
    let sitename = instance.try_decodeName(event.params.tokenId);
    if (!sitename.reverted) {
      token.name = sitename.value;
    }
    let ref = instance.try_refs(event.params.tokenId);
    if (!ref.reverted) {
      token.ref = ref.value.toHexString();
      let cid = instance.try_decodeCid(ref);
      if (!cid.reverted) {
        token.cid = cid.value;
      }
    }
  }

  token.owner = event.params.to.toHexString();

  if (!transfer) {
    transfer = new Transfer(transferId);
    transfer.token = event.params.tokenId.toHexString();
    transfer.from = event.params.from.toHexString();
    transfer.to = event.params.to.toHexString();
    transfer.timestamp = event.block.timestamp;
    transfer.block = event.block.number;
    transfer.transactionHash = event.transaction.hash.toHexString();
  }

  if (!contract) {
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

// Handle 	event Publish(address indexed owner,uint256 indexed tokenId,bytes32 indexed ref);
// Handle 	event Cancel(uint256 indexed tokenId);

export function handlePublish(event: Partaj.PublishEvent): void {
  let tokenId = event.params.tokenId.toString();
  let ref = event.params.ref.toHexString();
  let token = Token.load(tokenId);
  let contract = Contract.load(event.address.toHexString());

  if (!token) {
    token = new Token(tokenId);
    token.contract = event.address.toHexString();
    token.ref = ref;
  }

  token.owner = event.params.owner.toHexString();

  if (!contract) {
    contract = new Contract(event.address.toHexString());
    contract.chain = event.transaction.chainId;
    contract.totalSupply = BigInt.fromI32(1);
  } else {
    let totalSupply = contract.totalSupply;
    contract.totalSupply = totalSupply + Number(BigInt.fromI32(1));
  }

  token.save();
  contract.save();
}

export function handleCancel(event: Partaj.CancelEvent): void {
  let tokenId = event.params.tokenId.toString();
  let token = Token.load(tokenId);
  let contract = Contract.load(event.address.toHexString());

  if (token) {
    token.owner = null;
    token.ref = "";
    token.uri = "";
    token.name = "";
    token.cid = "";
    token.save();
  
    let totalSupply = contract.totalSupply;
    contract.totalSupply = totalSupply - Number(BigInt.fromI32(1));
    contract.save();
  }
}