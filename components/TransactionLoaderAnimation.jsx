import { css } from '@emotion/react'
import { MoonLoader } from 'react-spinners'

const style = {
  wrapper: `text-white h-96 w-72 center flex-col`,
  title: `font-semibold text-xl mb-12`,
}

const CustomStyle = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`

const TransactionLoaderAnimation = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Transaction in progress...</div>
      <MoonLoader color={'#fff'} loading={true} css={CustomStyle} size={50} />
    </div>
  )
}

export default TransactionLoaderAnimation
