"use client";

import Campaign from "./Campaign";
import PageWrapper from "../../components/PageWrapper";
import { Web3Provider } from "../../context/Web3Context";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Web3Provider>
      <PageWrapper>
        <Campaign />
      </PageWrapper>
    </Web3Provider>
  );
}

// import Campaign from "./Campaign";
// import PageWrapper_Alert_NoWallet from "./PageWrapperMetamask";
// import { useState, createContext } from "react";

// const PageContext = createContext(null);

// export default function Page({ params }: { params: { id: string } }) {
//   const [web3, setWeb3] = useState(undefined);
//   const [userAccount, setUserAccount] = useState<string>("");
//   return (
//     <PageContext.Provider
//       value={{ web3, userAccount, setWeb3, setUserAccount }}
//     >
//       <PageWrapper_Alert_NoWallet>
//         <Campaign></Campaign>
//       </PageWrapper_Alert_NoWallet>
//     </PageContext.Provider>
//   );
// }
// export { PageContext };
