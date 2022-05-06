import { useSetRecoilState } from "recoil"
import UAuth from "@uauth/js"
import { addressState } from "../database/atoms"

const uauth = new UAuth({
  clientID: "bc0f5520-2cca-4c93-8122-0a68954ae4a6",
  /**
   * @param redirectUri
   * use https://localhost:3000 for local environment
   * use https://eth.mirrorprotocol for production
   */
  redirectUri: "https://eth.mirrorprotocol",
})

const useUnstoppable = () => {
  const setAddress = useSetRecoilState(addressState)

  const onClick = async () => {
    try {
      const authorization = await uauth.loginWithPopup()
      setAddress(authorization.idToken.wallet_address!)
    } catch (error) {
      console.error(error)
    }
  }

  return { onClick }
}

export default useUnstoppable
