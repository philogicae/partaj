# Partaj

## Description

Decentralize your website instantly: https://partaj.eth.limo
Just drag and drop the output folder of your app (built or static website), and we'll give you a free permanent link. Or cancel it anytime, it's DePIN.
Partaj is your go-to for easy, decentralized sharing. Get started now!

## Why Partaj?

- Netlify is convenient and fast for anybody that wishes to host a static website. But it's centralized.
- About web2 solutions, Vercel is great but centralized.
- About web3 solutions, Fleek is great but can only host your frontend at the moment. Also, you depend on their gateways & IPFS nodes, and the stability of their whole infrastructure.
- On the other hand, Vercel and Fleek are too complicated for non-technical users to use.

## Tech Stack

- Scaffold-ETH 2 (NextJS, HardHat, TheGraph)
- Fleek (Frontend hosting)
- Aleph.im (VM on Decentralized Cloud to host Backend)
- TheGraph node for indexing (on VM)
- IPFS node for storage (on VM)
- Flask Server for IPFS gateway (on VM)
- Blockchain testnets: BNB Chain, Base, and Arbitrum
- ENS + Limo for decentralized domain names

## Future Developments

- Pay-as-you-go using stream solutions (Sablier or Llamapay) to host content continuously
- Paid fees shared/distributed to the node runners (The whole backend can be turned into a docker-composed easy-to-run node)
- Moved frontend from Fleek to Aleph-hosted backend node
- Gated-access though web2/web3 auth or conditions using Lit Protocol
- Github actions for easy continuous deployment Vercel-style
- ENS subdomains (<name>.partaj.eth.limo) instead of pathnames (partaj.eth.limo/<name>)
- Opensea full compatibility, for instance automatic website screenshot as a NFT cover

## Links

- https://partaj.eth.limo
- https://www.youtube.com/watch?v=9v27G-uO50Q
- https://dorahacks.io/buidl/10885
