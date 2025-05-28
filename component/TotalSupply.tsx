"use client"
import React from 'react'
import { erc20Abi, getAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

const USDC_BASE = getAddress('0x833589fCD6EDB6E08f4C7C32D4f71B54BDA02913')
// const USDC_BASE = '0x833589fCD6EDB6E08f4C7C32D4f71B54BDA02913'
const TotalSupply = () => {
  const { address } = useAccount()

  const { data, error, isLoading } = useReadContract({
    address: USDC_BASE,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address || '0x0000000000000000000000000000000000000000'],
  })

  if (isLoading) return <h1>Loading…</h1>
  if (error) return <h1>Error: {error.message}</h1>

  const balance = data ? Number(data) / 1e6 : 0 
  return (
    <div>
      <h1>USDC Balance (Base): {balance.toLocaleString()} USDC</h1>
    </div>
  )
}

export default TotalSupply
