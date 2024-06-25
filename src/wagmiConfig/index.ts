import { createConfig } from "@privy-io/wagmi"
import {
  beraTestnet,
  bitfinityTestnet,
  exosama,
  formTestnet,
  metisSepolia,
  neonEVM,
  oasisSapphire,
  ontology,
  palm,
  taikoKatlaTestnet,
  x1,
} from "static/customChains"
import { http, type Chain } from "viem"
import {
  arbitrum,
  arbitrumNova,
  astarZkEVM,
  avalanche,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  boba,
  bsc,
  celo,
  coreDao,
  cronos,
  cyber,
  evmos,
  fantom,
  gnosis,
  harmonyOne,
  kava,
  klaytn,
  linea,
  liskSepolia,
  lukso,
  mainnet,
  manta,
  mantle,
  metis,
  moonbeam,
  moonriver,
  opBNB,
  optimism,
  pgn,
  polygon,
  polygonZkEvm,
  ronin,
  scroll,
  scrollSepolia,
  sepolia,
  shimmer,
  taiko,
  x1Testnet,
  zetachain,
  zetachainAthensTestnet,
  zkSync,
  zora,
} from "wagmi/chains"

/**
 * We should consider adding only those chains here which we actually use for
 * client-side interactions (e.g. where users can mint Guild Pins, NFTs, buy tokens,
 * etc.)
 */
export const wagmiConfig = createConfig({
  chains: [
    mainnet,
    polygon,
    polygonZkEvm,
    base as Chain,
    baseSepolia as Chain,
    optimism as Chain,
    arbitrum,
    arbitrumNova,
    bsc,
    avalanche,
    gnosis,
    fantom,
    celo as Chain,
    harmonyOne,
    moonbeam,
    moonriver,
    metis,
    metisSepolia,
    cronos,
    boba,
    palm,
    exosama,
    evmos,
    zetachain,
    zetachainAthensTestnet,
    scroll,
    scrollSepolia,
    zkSync as Chain,
    zora as Chain,
    pgn,
    neonEVM,
    linea,
    lukso,
    mantle,
    ronin,
    shimmer,
    kava,
    bitfinityTestnet,
    x1,
    x1Testnet,
    ontology,
    beraTestnet,
    manta,
    taikoKatlaTestnet,
    blast,
    blastSepolia,
    oasisSapphire,
    sepolia,
    astarZkEVM,
    coreDao,
    liskSepolia as Chain,
    opBNB,
    formTestnet,
    cyber,
    taiko,
    klaytn,
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http("https://polygon-bor-rpc.publicnode.com"),
    [polygonZkEvm.id]: http(),
    [base.id]: http("https://base-pokt.nodies.app"),
    [baseSepolia.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumNova.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
    [gnosis.id]: http(),
    [fantom.id]: http(),
    [celo.id]: http(),
    [harmonyOne.id]: http(),
    [moonbeam.id]: http(),
    [moonriver.id]: http(),
    [metis.id]: http(),
    [metisSepolia.id]: http(),
    [cronos.id]: http(),
    [boba.id]: http(),
    [palm.id]: http(),
    [exosama.id]: http(),
    [evmos.id]: http("https://evmos.lava.build"),
    [zetachain.id]: http(),
    [zetachainAthensTestnet.id]: http(),
    [scroll.id]: http(),
    [scrollSepolia.id]: http(),
    [zkSync.id]: http(),
    [zora.id]: http(),
    [pgn.id]: http(),
    [neonEVM.id]: http(),
    [linea.id]: http(),
    [lukso.id]: http(),
    [mantle.id]: http(),
    [ronin.id]: http(),
    [shimmer.id]: http(),
    [kava.id]: http(),
    [bitfinityTestnet.id]: http(),
    [x1.id]: http(),
    [x1Testnet.id]: http(),
    [ontology.id]: http(),
    [beraTestnet.id]: http(),
    [manta.id]: http(),
    [taikoKatlaTestnet.id]: http(),
    [blast.id]: http(),
    [blastSepolia.id]: http(),
    [oasisSapphire.id]: http(),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [astarZkEVM.id]: http(),
    [coreDao.id]: http(),
    [liskSepolia.id]: http(),
    [opBNB.id]: http(),
    [formTestnet.id]: http(),
    [cyber.id]: http(),
    [taiko.id]: http(),
    [klaytn.id]: http(),
  },
  ssr: true,
})
