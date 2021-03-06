import Image from 'next/image'
import React, { useContext } from 'react'
import { RiSettings3Fill } from 'react-icons/ri'
import ethLogo from '../assets/eth.png'
import { AiOutlineDown } from 'react-icons/ai'
import { TransactionContext } from '../context/TransactionContext'
import TransactionLoaderAnimation from '../components/TransactionLoaderAnimation'
import { BsArrowDownShort } from 'react-icons/bs'
const style = {
  wrapper: `w-screen  flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] relative w-[30rem] md:w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  AddressInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
}

import Modal from 'react-modal'
import { useRouter } from 'next/router'

Modal.setAppElement('#__next') //! then only it will work

//! modal style
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

const Main = () => {
  const { formData, handleChange, sendTransaction } =
    useContext(TransactionContext)
  const router = useRouter()
  //  ! for handling our submit
  const handleSubmit = async (e) => {
    const { addressTo, amount } = formData

    e.preventDefault()

    if (!addressTo || !amount) return
    // console.log('????????  trans', sendTransaction())
    sendTransaction()
  }
  return (
    <div className={style.wrapper}>
      {/* Content */}
      <div className={style.content}>
        {/* Header for form */}
        <div className={style.formHeader}>
          <span>Swap</span>
          {/* setting logo */}
          <div>
            <RiSettings3Fill className={'animate-spin cursor-pointer'} />
          </div>
        </div>

        {/* Transfer prop container */}
        <div className={style.transferPropContainer}>
          {/* Transfer prop input */}
          <input
            className={style.AddressInput}
            placeholder="0.0"
            pattern="[0-9]*[.,]?[0-9]*$" //! check regex pattern on submit
            onChange={(e) => handleChange(e, 'amount')}
          />

          {/* Down arrow */}
          <div
            className="center absolute
            top-[155px] left-[50%] cursor-pointer rounded-3xl border-4 border-[#191b1f] bg-[#212429]"
          >
            <BsArrowDownShort className={'text-[#8f96ac]'} />
          </div>

          {/* currency selector */}
          <div className={style.currencySelector}>
            {/* currency selector content */}
            <div className={style.currencySelectorContent}>
              {/* currency selector icon */}
              <div className={style.currencySelectorIcon}>
                <Image src={ethLogo} height={25} width={25} />
                <span className={style.currencySelectorTicker}>ETH</span>
              </div>
              {/* currency selector arrow */}
              <AiOutlineDown className={style.currencySelectorArrow} />
            </div>
          </div>
        </div>
        {/* Address */}
        <div className={style.transferPropContainer}>
          <input
            type="text"
            className={style.AddressInput}
            placeholder="0x..."
            onChange={(e) => handleChange(e, 'addressTo')}
          />
          {/* <div className={style.currencySelector}></div> */}
        </div>
        {/* Confirm button */}
        <div onClick={(e) => handleSubmit(e)} className={style.confirmButton}>
          Confirm
        </div>
      </div>

      <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoaderAnimation />
      </Modal>
    </div>
  )
}

export default Main
