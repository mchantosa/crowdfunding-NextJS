import { useState, useEffect } from "react";
import { getWeb3 } from "../../utils/web3/web3";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [userAccount, setUserAccount] = useState<string | null>(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState<boolean>(false);

  useEffect(() => {
    const initWeb3 = async () => {
      if (!window.ethereum) {
        setIsWalletInstalled(false);
        return;
      }

      setIsWalletInstalled(true);
      const _web3 = await getWeb3();
      if (!_web3) return;
      setWeb3(_web3);

      const accounts = await _web3.eth.getAccounts();
      setUserAccount(accounts[0] || null);
    };

    initWeb3();

    const handleAccountsChanged = (accounts: string[]) => {
      setUserAccount(accounts.length > 0 ? accounts[0] : null);
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return { web3, userAccount, isWalletInstalled };
};
