# The frond-end dApp of TicketMaker
This repo contains the front-end web3 application of the TicketMaker online NFT event and ticketing tool

# Features
- An online tool for the ease of creation of event and the NFT ticket collections and
the sales pages for ticket sales. 
- Event organizers can easily share their ticket sales page on social media
- Edit event, view ticket sales on the dashboard and view customers

# Live Demo
You can try out a live version on NEAR testnet on https://ticketmaker.xyz

# To run this on your localhost
- Git clone this repo
- And run 

yarn start 

and open your browser at http://localhost:3000

- For ticket image to be able to upload to Arweave, you'll need to add a .env file 
into the root folder of this repo that contains at least REACT_APP_ARWEAVE_KEY as follows:

REACT_APP_ARWEAVE_KEY=Arweave-wallet-private-key

Replace "Arweave-wallet-private-key" with your Arweave wallet's private key

# Repos for smart contracts
The repo for the NEAR smart contracts can be found on https://github.com/ketyung?tab=repositories&q=tm_

## License 
MIT License
Copyright (c) 2022 Christopher Ket Yung Chee. See [License](https://github.com/ketyung/tm_dapp/blob/master/LICENSE.md) for details
