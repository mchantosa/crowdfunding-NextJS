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
