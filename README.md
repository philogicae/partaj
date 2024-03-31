# Partaj

## Description

Decentralize your website instantly: https://partaj.eth.limo

Just drag and drop the output folder of your app (built or static website), and we'll give you a free permanent link. Or cancel it anytime, it's DePIN.

Built during ETHBucharest 2024.

## Why Partaj?

- About web2 solutions, Netlify is convenient and fast for anybody that wishes to host a static website. Vercel is great for devs. But those platforms are centralized.
- About web3 solutions, Fleek is prettry good but can only host your frontend at the moment. Also, you depend on their gateways, their IPFS nodes and the stability of their whole infrastructure.
- On the other hand, Vercel and Fleek are too complicated for non-techs to use.

## Tech Stack

- Scaffold-ETH 2 (NextJS, HardHat, TheGraph)
- Fleek (Frontend hosting)
- Aleph.im (VM on Decentralized Cloud to host Backend)
- TheGraph node for indexing (on VM)
- IPFS node for storage (on VM)
- Flask Server for IPFS gateway (on VM)
- Blockchain testnets: BNB Chain, Base, and Arbitrum
- ENS + Limo for decentralized domain names

![Architecture](https://github.com/philogicae/partaj/assets/38438271/b0e02fff-dbe8-4da1-a343-e6a02fcdd14f)

## Future Developments

- Pay-as-you-go using stream solutions (Sablier or Llamapay) to host content continuously
- Paid fees shared/distributed to the node runners (The whole backend can be turned into a docker-composed easy-to-run node)
- Moved frontend from Fleek to Aleph-hosted backend node
- Gated-access though web2/web3 auth or conditions using Lit Protocol
- Github actions for easy continuous deployment Vercel-style
- ENS subdomains (name.partaj.eth.limo) instead of pathnames (partaj.eth.limo/name)
- Opensea full compatibility, for instance automatic website screenshot as a NFT cover

## Links

- https://partaj.eth.limo
- https://www.youtube.com/watch?v=9v27G-uO50Q
- https://dorahacks.io/buidl/10885
