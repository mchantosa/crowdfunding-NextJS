"use client";

import Campaign from "./Campaign";
import PageWrapper_Alert_NoWallet from "./PageWrapperMetamask";
import { useState, createContext } from "react";

const PageContext = createContext(null);

export default function Page({ params }: { params: { id: string } }) {
  const [web3, setWeb3] = useState(undefined);
  const [userAccount, setUserAccount] = useState<string>("");
  return (
    <PageContext.Provider
      value={{ web3, userAccount, setWeb3, setUserAccount }}
    >
      <PageWrapper_Alert_NoWallet>
        <Campaign></Campaign>
      </PageWrapper_Alert_NoWallet>
    </PageContext.Provider>
  );
}
export { PageContext };
