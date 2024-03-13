import { config } from "@/config/config"
import { Contract, providers } from "ethers"
import MainABI from "@/abis/MainContract"

export const getContract = async (provider) => {
    try {
        const contract = new Contract(config.MAIN_CONTRACT, MainABI, provider.getSigner());
        return contract;
    } catch (error) {
        console.log("Error while getting contract", error);
    }
}