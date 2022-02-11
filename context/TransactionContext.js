import React, { useEffect, useState } from 'react'

// ! TransactionContext
export const TransactionContext = React.createContext()

// ! we will set out eth
let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  useEffect(() => {
    checkIfWalletIsConnected()
    // ? every time refresh the page, we will check if the wallet is connected
  }, [])
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
      //! Transaction contract
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)
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
      
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  return (
    // * it create a global bucket and throwing the current account and wallet so any of out components can have access
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
