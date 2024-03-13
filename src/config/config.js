import { z } from "zod"
import { config as dotenv } from "dotenv";
dotenv();
const envSchema = z.object({
    TSTToken: z.string().default("0x31213FF9ff4296B747028041eF354002aD785b85"),
    SHMToken: z.string().optional().default("0x2d9FE6DFa994261c46e3a203ba6619726BB05e63"),
    UniswapRouter: z.string().optional().default("0xECA7c18438c86F63Cc8a56F376Da97Fd77ccC365"),
    Slippage: z.number().default(2),
    GIT_CONTRACT: z.string().default("0x17486C4e34b2b6c6690C835Ab7bbDA6e5722E239"),
    MAIN_CONTRACT: z.string().optional().default("0x143773359A6Fe427062C7bd659c7592309b58f49"),
    PRIVATE_KEY: z.string().optional().default(""),
    SHARDEUM_RPC: z.string().optional().default("https://hackathon.shardeum.org/"),
    PINATE_KEY: z.string().optional().default(""),
    PINATA_GATEWAY: z.string().optional().default(""),
});

export const config = envSchema.parse(process.env);
