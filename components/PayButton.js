import { useReadContract, useAccount, useBalance, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { useState } from "react";

export default function PayButton({ cartItems }) {
    const { address } = useAccount();
    const { data: balanceData } = useBalance({ address });
    const [isLoading, setIsLoading] = useState(false);

    const totalUsdAmount = cartItems.reduce(
        (sum, item) => sum + item.fiatPrice * item.quantity,
        0
    );

    const totalFiatBigInt = BigInt(Math.floor(totalUsdAmount));

    const { data: ethResult, refetch } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'convertUsdToEth',
        args: [totalFiatBigInt],
        watch: false,
    });

    const { writeContract } = useWriteContract();

    const handlePayClick = async () => {
        try {
            setIsLoading(true);

            const result = await refetch();
            const ethAmount = result.data;

            const productIds = cartItems.map((item) => BigInt(item.id));
            const quantities = cartItems.map((item) => BigInt(item.quantity));
            const userBalance = balanceData?.value || 0n;

            const ethValue = Number(ethAmount) / 1e18;
            const ethBalance = Number(userBalance) / 1e18;

            const confirmPay = confirm(`🧾 Total: ${ethValue.toFixed(18)} ETH\n💰 Your Balance: ${ethBalance.toFixed(18)} ETH\n\nProceed?`);
            if (!confirmPay) return;

            if (userBalance < ethAmount) {
                alert("❌ Not enough ETH balance.");
                return;
            }

            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'buyProducts',
                args: [productIds, quantities],
                value: ethAmount,
            });

            alert("✅ Purchase submitted!");
        } catch (err) {
            console.error("❌ Transaction failed:", err);
            alert("❌ Transaction failed. Check console.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={cartItems.length === 0 || isLoading}
            onClick={handlePayClick}
        >
            {isLoading ? "Processing..." : "Pay"}
        </button>
    );
}
