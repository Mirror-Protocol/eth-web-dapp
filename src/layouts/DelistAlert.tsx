import { useState } from "react"
import { delistedSymbols } from "../whitelist/delisted"
import Modal from "../containers/Modal"
import DelistModalContent from "./DelistModalContent"
import Banner from "./Banner"

const DelistAlert = () => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <Banner
        title={`${delistedSymbols} is scheduled to be delisted from mETH`}
      >
        <button onClick={open}>Details</button>
      </Banner>

      <Modal isOpen={isOpen} open={open} close={close}>
        <DelistModalContent close={close} />
      </Modal>
    </>
  )
}

export default DelistAlert
