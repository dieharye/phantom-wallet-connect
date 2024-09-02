"use client"

import React, { useEffect } from 'react';
import Backpack from "@/components/Assests/Wallet/Backpack.svg";
import Phantom from "@/components/Assests/Wallet/Phantom.svg";
import Solflare from "@/components/Assests/Wallet/Solflare.svg";
import Magiceden from "@/components/Assests/Wallet/Magiceden.svg";
import NextImage from "next/image";
import { useWallet } from '@solana/wallet-adapter-react';

function WalletModal({ isOpen, onClose }) {

    const { wallets, select } = useWallet();
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <>
            {isOpen ? <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 animate-in fade-in duration-1000" onClick={onClose}>
                <div className="rounded-lg p-0 flex flex-col animate-in fade-in duration-2000">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="flex-row justify-center space-y-6" onClick={(e) => e.stopPropagation()}
                        >
                            <NextImage
                                src={Solflare}
                                alt="Solflare"
                                width={300}
                                height={300}
                                className="opacity-0 animate-fadeInDown cursor-pointer"
                                style={{ animationDelay: `800ms` }}
                                onClick={() => {
                                    select("Solflare")
                                    onClose()
                                }}
                            />
                            <NextImage
                                src={Phantom}
                                alt="Phantom"
                                width={300}
                                height={300}
                                className="opacity-0 animate-fadeInDown cursor-pointer"
                                style={{ animationDelay: `600ms` }}
                                onClick={() => {
                                    select("Phantom")
                                    onClose()
                                }}
                            />
                            <NextImage
                                src={Backpack}
                                alt="Backpack"
                                width={300}
                                height={300}
                                className="opacity-0 animate-fadeInDown cursor-pointer"
                                style={{ animationDelay: `400ms` }}
                                onClick={() => {
                                    select("Backpack")
                                    onClose()
                                }}
                            />
                            <NextImage
                                src={Magiceden}
                                alt="MagicEden"
                                width={300}
                                height={300}
                                className="opacity-0 animate-fadeInDown cursor-pointer"
                                style={{ animationDelay: `200ms` }}
                                onClick={() => {
                                    select("Magic Eden")
                                    onClose()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
                : null}
        </>

    );
};


export default WalletModal