import { useState } from "react";
// import { useOpenbookClient } from "../hooks/useOpenbookClient";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { OracleConfigParams } from "@openbook-dex/openbook-v2";
import { useOpenbookClient } from "../hooks/useOpenbookClient";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

const CreateMarket = () => {
  const { publicKey } = useWallet();

  const [name, setName] = useState("");
  const [quoteMint, setQuoteMint] = useState(PublicKey.default);
  const [baseMint, setBaseMint] = useState(PublicKey.default);
  const [quoteLotSize, setQuoteLotSize] = useState("");
  const [baseLotSize, setBaseLotSize] = useState("");
  const [makerFee, setMakerFee] = useState("0");
  const [takerFee, setTakerFee] = useState("0");
  const [timeExpiry, setTimeExpiry] = useState("0");
  const [oracleA, setOracleA] = useState(null);
  const [oracleB, setOracleB] = useState(null);
  const [openOrdersAdmin, setOpenOrdersAdmin] = useState(PublicKey.default);
  const [consumeEventsAdmin, setConsumeEventsAdmin] = useState(
    PublicKey.default
  );
  const [closeMarketAdmin, setCloseMarketAdmin] = useState(PublicKey.default);
  const [confFilter, setConfFilter] = useState("0.1");
  const [maxStalenessSlots, setMaxStalenessSlots] = useState("100");

  const openbookClient = useOpenbookClient();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const oracleConfigParams: OracleConfigParams = {
      confFilter: Number(confFilter),
      maxStalenessSlots: Number(maxStalenessSlots),
    };
    try {
      openbookClient
        .createMarket(
          publicKey,
          name,
          quoteMint,
          baseMint,
          new BN(quoteLotSize),
          new BN(baseLotSize),
          new BN(makerFee),
          new BN(takerFee),
          new BN(timeExpiry),
          oracleA,
          oracleB,
          openOrdersAdmin,
          consumeEventsAdmin,
          closeMarketAdmin,
          oracleConfigParams
        )
        .then(async ([transactionInstructions, signers]) => {
          // Process the results here
          const ixTransfer = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(
              "2fmQLSF1xR5FK3Yc5VhGvnrx7mjXbNSJN3d3WySYnzr6"
            ),
            lamports: LAMPORTS_PER_SOL,
          });
          const tx = await openbookClient.sendAndConfirmTransaction(
            [ixTransfer, ...transactionInstructions],
            {
              additionalSigners: signers,
            }
          );
          console.log("Create Market tx", tx);
          toast("Create Market tx: " + tx.toString());
        })
        .catch((error) => {
          // Handle any errors that might occur during the execution of the promise
          console.error("Error:", error);
        });
    } catch (error) {
      console.log("Error on the form", error);
      // Handle errors
    }
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white-900">
            Create a market
          </h2>
          <p className="mt-1 text-sm leading-6 text-grey-600">
            You will be able to create a permissioned or permissionles market.
            You will need at least 3 SOL in your account. There is 1 SOL fee for
            creating a market using this UI. Run it locally or fork it to avoid
            the fee.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md py-1.5 pl-2 pl-2 text-black font-bold shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quote-mint"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Quote Mint
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setQuoteMint(new PublicKey(e.target.value))}
                  className="block w-full rounded-md  py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Base Mint
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setBaseMint(new PublicKey(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quote-mint"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Quote Lot Size
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setQuoteLotSize(e.target.value)}
                  className="block w-full rounded-md  py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Base Lot Size
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setBaseLotSize(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quote-mint"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Maker Fee
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setMakerFee(e.target.value)}
                  className="block w-full rounded-md  py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Taker Fee
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setTakerFee(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Time Expiracy (Only for markets that can be closed)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setTimeExpiry(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quote-mint"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Oracle A (Optional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setOracleA(new PublicKey(e.target.value))}
                  className="block w-full rounded-md  py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Oracle B (Optional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setOracleB(new PublicKey(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quote-mint"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Max Staleness Slots (Optional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setMaxStalenessSlots(e.target.value)}
                  className="block w-full rounded-md  py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Configuration Filter (Optional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setConfFilter(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quote-mint"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Open Orders Admin (Permissioned Markets)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) =>
                    setOpenOrdersAdmin(new PublicKey(e.target.value))
                  }
                  className="block w-full rounded-md  py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Consume Events Admin (Permissioned Markets)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) =>
                    setConsumeEventsAdmin(new PublicKey(e.target.value))
                  }
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Close Market Admin (Permissioned Markets)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) =>
                    setCloseMarketAdmin(new PublicKey(e.target.value))
                  }
                  className="block w-full rounded-md border-0 py-1.5 pl-2  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 items-center">
        <button
          type="submit"
          onClick={(e: any) => handleSubmit(e)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Market
        </button>
      </div>
    </form>
  );
};

export default CreateMarket;
