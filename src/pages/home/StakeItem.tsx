import { useRecoilValue } from "recoil"

import { gt } from "../../libs/math"
import { format, formatAsset } from "../../libs/parse"
import { percent } from "../../libs/num"
import StakeItemCard from "../../components/StakeItemCard"

import { uniswapLinksQuery } from "../../database/uniswap"
import { balanceQuery } from "../../database/balance"
import AddToMetamask from "./AddToMetamask"
import StakeItemButton from "./StakeItemButton"

const StakeItem = (props: AssetInfo) => {
  const { token, symbol, status, lp, pool, price, apr, lpStaked } = props
  const stakable = useRecoilValue(balanceQuery(lp))
  const staked = useRecoilValue(balanceQuery(pool))
  const { swap, add } = useRecoilValue(uniswapLinksQuery(token))
  const isDelisted = status === "DELISTED"

  const item = {
    token,
    symbol,
    stakable: stakable ? gt(stakable, 0) : false,
    staked: staked ? gt(staked, 0) : false,
    apr: percent(apr),
    totalStaked: formatAsset(lpStaked, "LP", { integer: true }),
    price: `${format(price)} UST`,
    emphasize: symbol === "MIR",
    isDelisted,
  }

  return (
    <StakeItemCard {...item} action={<AddToMetamask {...props} />}>
      <StakeItemButton href={swap}>Buy token</StakeItemButton>

      <StakeItemButton href={add} delisted={isDelisted}>
        Provide liquidity
      </StakeItemButton>

      <StakeItemButton to={`/stake/${token}`} delisted={isDelisted}>
        Stake LP
      </StakeItemButton>
    </StakeItemCard>
  )
}

export default StakeItem
