import React, { useContext, useEffect, useState } from 'react'
import { client } from '../lib/sanityClinet'
import ethLogo from '../assets/ethCurrency.png'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import { TransactionContext } from '../context/TransactionContext'

const style = {
  wrapper: `h-full font-medium text-xs md:text-sm text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#262628]   rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center `,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`,
  imageContainer: `mr-2`,
}
const TransactionHistory = () => {
  const { isLoading, currentAccount } = useContext(TransactionContext)
  //! History we pull fom sanity
  const [transactionHistory, setTransactionHistory] = useState()
  // ! transactions fade animate
  useEffect(() => {
    ;(async () => {
      if (!isLoading && currentAccount) {
        const query = `
          *[_type=="users" && _id == "${currentAccount}"] {
            "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..4]
          }
        `

        const clientRes = await client.fetch(query)

        setTransactionHistory(clientRes[0].transactionList)
      }
    })()
  }, [isLoading, currentAccount])
  return (
    <div className={style.wrapper}>
      <div>
        {transactionHistory?.map((transaction, index) => (
          <div className={style.txHistoryItem} key={index}>
            {/* Image and details */}
            <div className={style.txDetails}>
              <div className={style.imageContainer}>
                <Image src={ethLogo} height={20} width={15} alt="eth" />
              </div>
              {transaction.amount} Ξ sent to{' '}
              <span className={style.toAddress}>
                {transaction.toAddress.substring(0, 8)}...
              </span>
            </div>
            {''}
            on {''}
            {/* Time stamp */}
            <div className={style.txTimestamp}>
              {new Date(transaction.timestamp).toLocaleString('en-US', {
                timeZone: 'PST',
                hour12: true,
                timeStyle: 'short',
                dateStyle: 'long',
              })}
            </div>
            {/* Scan Link */}
            <div className={style.etherscanLink}>
              {/* if we click it will take to our transaction */}
              <a
                href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                target="_blank"
                rel="noreferrer"
                className={style.etherscanLink}
              >
                View on Etherscan
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionHistory
