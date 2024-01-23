import {
  findAllMarkets,
  MarketAccount,
  BookSideAccount,
  OPENBOOK_PROGRAM_ID,
  OpenBookV2Client,
} from "@openbook-dex/openbook-v2";
import { PublicKey } from "@solana/web3.js";
import {
  useOpenbookClient,
  useHookConnection,
  useFakeProvider,
} from "../hooks/useOpenbookClient";

// MAINNET
export const RPC = "https://misty-wcb8ol-fast-mainnet.helius-rpc.com/";
// DEVNET
// export const RPC = "https://aimil-f4d13p-fast-devnet.helius-rpc.com/";

export const fetchData = async () => {
  const connection = useHookConnection();
  const provider = useFakeProvider();
  let markets = await findAllMarkets(connection, OPENBOOK_PROGRAM_ID, provider);
  return markets;
};

export const getMarket = async (
  client: OpenBookV2Client,
  publicKey: string
): Promise<MarketAccount> => {
  let market = await client.getMarketAccount(new PublicKey(publicKey));
  return market ? market : ({} as MarketAccount);
};
