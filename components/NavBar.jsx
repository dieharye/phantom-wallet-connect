"use client";

import { useState, useEffect, useCallback } from "react";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletModal from "@/components/WalletModal";
import { useAppContext } from "@/contexts/AppContext";
import { signIn } from "@/action";

export default function NavBar({ className }) {
  const wallet = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSigned, setIsSigned } = useAppContext();
  const {
    buttonState,
    onDisconnect,
  } = useWalletMultiButton({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    sign();
  };

  useEffect(() => {
    if (buttonState === "connected") {
      closeModal();
      // alert("Signed")
    } else if (buttonState === "no-wallet") {
      setIsSigned(false);
    }
  }, [buttonState,]);

  const handleWalletChange = () => {
    switch (buttonState) {
      case "no-wallet":
        openModal();
        break;
      // case "has-wallet":
      //   console.log(buttonState);
      //   if (onConnect) {
      //     onConnect();
      //   }
      //   break;
      default:
        if (isSigned) signOut();
        onDisconnect();
    }
  };

  //SignUp and signIn at once.
  const sign = useCallback(async () => {
    if (isSigned) return;
    if (buttonState == "connected") {
      const response = await signIn(wallet);
      console.log(response);
      setIsSigned(response.isSigned);
      // if (!response.isSigned) onDisconnect();
    }
  }, [isSigned, buttonState, wallet, setIsSigned, onDisconnect]);

  //SignOut by removing the token from LocalStorage
  const signOut = useCallback(async () => {
    window.localStorage.removeItem("token");
    setIsSigned(false);
  }, [setIsSigned]);

  return (
    <>
      <nav
        className={`${className} fixed w-full flex justify-end border-border items-center py-4 px-8 backdrop-blur-sm bg-primary-background/30`}
      >
        <div className="flex gap-2">
          <button
            onClick={handleWalletChange}
            className="h-[52px] rounded-[6px] border-0 py-[8px] px-[16px]"
          >
            {buttonState == "no-wallet" ? "Connect" : "Disconnect"}
          </button>
        </div>
      </nav>
      <WalletModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
