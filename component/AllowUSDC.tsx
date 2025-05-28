'use client'

import React, { useState } from 'react'
import { getAddress } from 'viem'
import { useWriteContract } from 'wagmi'
import { useAccount } from 'wagmi'

const AllowUSDC = () => {
    const [amount, setAmount] = useState('')
    const { address, isConnected } = useAccount()
    const { writeContractAsync } = useWriteContract()

    const USDC_BASE = getAddress('0x833589fCD6EDB6E08f4C7C32D4f71B54BDA02913')
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isConnected || !address) {
            alert("Please connect your wallet first.")
            return
        }

        try {
            await writeContractAsync({
                address: USDC_BASE,
                abi: [
                    {
                        "inputs": [
                            { "internalType": "address", "name": "spender", "type": "address" },
                            { "internalType": "uint256", "name": "amount", "type": "uint256" }
                        ],
                        "name": "approve",
                        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                functionName: 'approve',
                args: [
                    address || '0x',
                    BigInt(Number(amount) * 1e6)
                ],
                account: address,
            })
            console.log("Allow USDC form submitted")
        } catch (err) {
            console.error("Transaction failed:", err)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h1>Allow USDC</h1>
                <p>To allow USDC, please enter an amount and click the button below.</p>
                <input
                    type="number"
                    placeholder="1000"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.000001"
                />
                <button type="submit" disabled={!isConnected}>Allow USDC</button>
            </form>
        </div>
    )
}

export default AllowUSDC
