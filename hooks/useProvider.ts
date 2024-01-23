import { AnchorProvider } from "@coral-xyz/anchor";
import { useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useFakeProvider } from "./useOpenbookClient";

export function useProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = useMemo(
    () => new AnchorProvider(connection, wallet as any, {}),
    [connection, wallet]
  );

  return provider;
}
