// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Bytes32IpfsCid } from "ipfs-cid-in-bytes32/contracts/Bytes32IpfsCid.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Partaj is ERC721 {
	// Subdomains are encoded from str to int (tokenIds)
	// ipfs CIDs are encoded from str to bytes32 (refs)
	mapping(uint256 => bytes32) public refs;

	event Publish(
		address indexed owner,
		uint256 indexed tokenId,
		bytes32 indexed ref
	);
	event Cancel(uint256 indexed tokenId);

	constructor() ERC721("Partaj", "PTJ") {}

	function _baseURI() internal pure override returns (string memory) {
		return "https://partaj.eth.limo/";
	}

	function tokenURI(
		uint256 tokenId
	) public view virtual override returns (string memory) {
		_requireMinted(tokenId);
		return
			string(
				abi.encodePacked(
					_baseURI(),
					string(abi.encodePacked((tokenId)))
				)
			);
	}

	function mint(uint256 tokenId, bytes32 ref) public {
		address owner = _msgSender();
		_safeMint(owner, tokenId);
		refs[tokenId] = ref;
		emit Publish(owner, tokenId, ref);
	}

	function burn(uint256 tokenId) public {
		_burn(tokenId);
		emit Cancel(tokenId);
	}

	function encodeName(
		string memory name
	) external pure returns (uint256 tokenId) {
		tokenId = uint256(bytes32(abi.encodePacked(name)));
	}

	function decodeName(
		uint256 tokenId
	) external pure returns (string memory name) {
		name = string(abi.encodePacked((tokenId)));
	}

	function encodeCid(string memory cid) external pure returns (bytes32 ref) {
		ref = Bytes32IpfsCid.encode(cid);
	}

	function decodeCid(bytes32 ref) external pure returns (string memory cid) {
		cid = Bytes32IpfsCid.decode(ref);
	}
}
