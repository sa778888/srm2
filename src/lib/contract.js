import { config } from "@/config/config"
import { Contract } from "ethers"
import MainABI from "@/abis/MainContract"

export const contract = async (signer) => {
    try {

        const contract = new Contract(config.MAIN_CONTRACT, MainABI, signer);
        return contract;
    } catch (error) {
        console.log("Error while getting contract", error);
    }
}