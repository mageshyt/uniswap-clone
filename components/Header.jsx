import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import ethLogo from '../assets/eth.png'
import uniswapLogo from '../assets/uniswap.png'
import { FiArrowUpRight } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { TransactionContext } from '../context/TransactionContext'

const styles = {
  container: 'flex justify-between items-center w-screen p-4',
  headerLogo: `flex  w-1/4  items-center justify-start`,
  //! nac styles
  nav: 'flex-1 hidden md:inline-flex center',
  navContainer: 'flex  bg-[#191B1F] rounded-3xl',
  navItem:
    'px-4 py-2 m-2 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl',
  activeNav: 'bg-gray-800',

  // ! buttons styles
  buttonsContainer: 'flex justify-end items-center',
  button:
    'flex items-center rounded-2xl mx-2 text-[0.9rem] font-semibold  bg-[#191B1F] cursor-pointer',
  // ! padding  button
  buttonPadding: 'py-2 px-2',
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `center w-8 h-8`,
  buttonAccent:
    ' center text-[#4F90EA] bg-[#172A42] rounded-xl border border-[#163256] hover:border-[#325e98]',
}
const Header = () => {
  const [selectedOption, setSelectedOption] = useState('swap')
  const { connectWallet, currentAccount } = useContext(TransactionContext)
  // !use name
  const [UserName, setUserName] = useState()
  //! everytime we change the account we need to update the name
  useEffect(() => {
    if (!currentAccount) return
    setUserName(
      `${currentAccount.slice(0, 6)}...${currentAccount.slice(9, 13)}`
    )
  }, [currentAccount])

  return (
    <div className={styles.container}>
      {/* logo left part */}
      <div className={styles.headerLogo}>
        <Image height={40} width={40} src={uniswapLogo} alt="" />
      </div>

      {/* middle part --> options */}
      <div className={styles.nav}>
        <div className={styles.navContainer}>
          {/* nac items */}

          {/* Swap */}
          <div
            // ! active one will have a different color
            className={`${styles.navItem} ${
              selectedOption === 'swap' && styles.activeNav
            }`}
            onClick={() => setSelectedOption('swap')}
          >
            Swap
          </div>

          {/*  pool*/}
          <div
            // ! active one will have a different color
            className={`${styles.navItem} ${
              selectedOption === 'pool' && styles.activeNav
            }`}
            onClick={() => setSelectedOption('pool')}
          >
            Pool
          </div>
          {/* vote */}
          <div
            // ! active one will have a different color
            className={`${styles.navItem} ${
              selectedOption === 'vote' && styles.activeNav
            }`}
            onClick={() => setSelectedOption('vote')}
          >
            Vote
          </div>
          {/* charts */}

          {/* upArrow */}
          <a
            href="https://info.uniswap.org/#/"
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.navItem}>
              Charts <FiArrowUpRight />
            </div>
          </a>
        </div>
      </div>
      {/* Right --> button Container */}
      <div className={styles.buttonsContainer}>
        {/* buttons */}
        <div className={`${styles.button} ${styles.buttonPadding}`}>
          {/* button -1 */}
          <div className={styles.buttonIconContainer}>
            {/* Eth logo */}
            <Image src={ethLogo} alt="eth logo" height={20} width={20} />
          </div>
          <p className="hidden lg:block">Ethereum</p>
          {/* down arrow btn */}
          <div className={styles.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {/* button-2 */}
        {currentAccount ? (
          <div className={`${styles.buttonAccent} ${styles.buttonPadding} `}>
            {UserName}
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${styles.button} ${styles.buttonPadding} `}
          >
            {/* connect wallet button */}

            <div className={`${styles.buttonAccent} ${styles.buttonPadding} `}>
              Connect Wallet
            </div>
          </div>
        )}
        {/* button 3 */}
        <div className={`${styles.button} ${styles.buttonPadding}`}>
          <div className={`${styles.buttonIconContainer} mx-2`}>
            <HiOutlineDotsVertical />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
