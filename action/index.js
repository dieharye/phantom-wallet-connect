import bs58 from "bs58";
import { API_URL } from "@/config";
import axios from "axios";

export const signIn = async (wallet) => {
  console.log("wallet===================>",wallet)
  let message = "";
  const walletAddress = wallet.publicKey.toBase58();
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, {
      walletAddress,
    });
    if (!data.success) {
      return { success:false, isSigned: false };;
    }
    message = data?.message;
  } catch (error) {
    return { success:false, isSigned: false };;
  }

  const encodedMessage = new TextEncoder().encode(message);
  let signedMessage = "";

  try {
    signedMessage = await wallet.signMessage(encodedMessage, "utf8");
    signedMessage = bs58.encode(signedMessage);
  } catch (error) {
    return { success:false, isSigned: false };
  }

  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, {
      walletAddress,
      signedMessage,
    });
    let alert = {};
    if (!data.success) {
      return {success:false, isSigned:false}
    } else {
      window.localStorage.setItem("token", data?.token);
    }
    return { success:true, isSigned: true };
  } catch (error) {
    console.log(error)
    return { success: false, isSigned: false };
  }
};
