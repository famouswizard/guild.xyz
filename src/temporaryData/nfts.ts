import { NFT } from "./types"

enum NftAddressTypePairs {
  "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7" = "loot",
  "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb" = "cryptopunks",
  "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" = "bayc",
  "0x1A92f7381B9F03921564a437210bB9396471050C" = "coolcats",
  "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03" = "nouns",
}

const nfts: NFT[] = [
  {
    name: "Loot (for Adventurers)",
    address: "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7",
    logoURI:
      "https://lh3.googleusercontent.com/g-NFUWjS4IGgym8PHBxyhg5-G_B4x-IHgPKRkxo00JQFE3LOd-95yU2uhrokITVmV7KHEav6OMfAhfJ4roC5hwP-0tI9dMRd9wQLdw=s130",
  },
  {
    name: "CryptoPunk",
    address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    logoURI:
      "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130",
  },
  {
    name: "Bored Ape Yacht Club",
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    logoURI:
      "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130",
  },
  {
    name: "Cool Cats NFT",
    address: "0x1A92f7381B9F03921564a437210bB9396471050C",
    logoURI:
      "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s130",
  },
  {
    name: "Nouns",
    address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
    logoURI:
      "https://lh3.googleusercontent.com/vfYB4RarIqixy2-wyfP4lIdK6fsOT8uNrmKxvYCJdjdRwAMj2ZjC2zTSxL-YKky0s-4Pb6eML7ze3Ouj54HrpUlfSWx52xF_ZK2TYw=s130",
  },
]

export { nfts, NftAddressTypePairs }
