import * as React from "react";

interface EmailTemplateProps {
  contractAddress: string;
  network: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  contractAddress,
  network,
}) => (
  <div>
    <h1>Your Smart Contract is Live!</h1>
    <p>
      Your smart contract <strong>{contractAddress}</strong> has been
      successfully deployed on the <strong>{network}</strong> network.
    </p>
  </div>
);
