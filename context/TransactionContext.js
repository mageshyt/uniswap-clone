import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { contractAbi, contractAddress } from '../lib/constants'
import { client } from '../lib/sanityClinet'
// ! TransactionContext
export const TransactionContext = React.createContext()

// ! we will set out eth
let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

//! getEthereumContract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth) //! we call our provider
  const signer = provider.getSigner() // ! person who is signer which means we or sender
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  ) // ! we create a new contract
  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    addressTo: '', // !sending address
  })
  useEffect(() => {
    checkIfWalletIsConnected()
    // ? every time refresh the page, we will check if the wallet is connected
  }, [])

  // ! user profile
  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        address: currentAccount,
        UserName: 'unnamed',
        address: currentAccount,
      }
      // Create a new document if it doesn't exist
      await client.createIfNotExists(userDoc)
    })()
  }, [currentAccount])
  const connectWallet = async (metamask = eth) => {
    try {
      //! if there is no metamask then alert the user to install

      if (!metamask) return alert('Please install metamask ')

      const accounts = await metamask.request({
        method: 'eth_requestAccounts',
      })

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  // * for checking wallet is connected or not
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      //! if there is no metamask then alert the user to install

      if (!metamask) return alert('Please install metamask ')
      const accounts = await eth.request({
        method: 'eth_requestAccounts', // ! request the user to connect the wallet
      })
      if (accounts.length) {
        setCurrentAccount(accounts[0]) //! set first account as initial
        console.log('wallet is connected  😀')
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  // * for sending Transaction
  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      //! if there is no metamask then alert the user to install

      if (!metamask) return alert('Please install metamask ')
      const { addressTo, amount } = formData
      // console.log('🚀 formData', formData)
      //! Transaction contract
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)
      // console.log('parsedAmount', parsedAmount)
      //! send transaction
      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40',
            value: parsedAmount._hex,
          },
        ],
      })

      //! transaction hash
      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER'
      )
      // ! here transaction is happening
      setIsLoading(true)

      await transactionHash.wait()

      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo
      )
      //  ! our transaction is finished
      setIsLoading(false)

      //! database part
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }
  //! for saveTransaction and in our sanity database
  const saveTransaction = async (
    txHash,
    amount,
    fromAddress = currentAccount,
    toAddress
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    }

    // ! if the transaction not exists in our sanity then we will create
    await client.createIfNotExists(txDoc)
    // ! for our user tr session
    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        {
          _key: txHash,
          _ref: txHash,
          _type: 'reference',
        },
      ])
      .commit() // ! meaning that write all of this and commit it is sanity

    return
  }

  const router = useRouter()
  // * lets trigger our loading model
  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } else {
      router.push('/')
    }
  }, [isLoading])
  return (
    // * it create a global bucket and throwing the current account and wallet so any of out components can have access
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
