import { createContext, useState } from 'react'

import { hasAuthenticated } from '../services/AuthApi'

const AdminContext = createContext()
export default AdminContext

export const AdminContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated())
  const [triggered, setTriggered] = useState(false)
  const [addPopUp, setAddPopUp] = useState(false)
  const [modPopUp, setModPopUp] = useState(false)
  const [viewPopUp, setViewPopUp] = useState(false)
  const [modId, setModId] = useState()

  const handlePopUpBg = () => {
    const noScroll = document.getElementById('entity')
    noScroll.style.overflow === 'hidden'
      ? (noScroll.style.overflow = 'auto')
      : (noScroll.style.overflow = 'hidden')
  }

  const handlePopUpAdd = () => {
    handlePopUpBg()
    addPopUp === false ? setAddPopUp(true) : setAddPopUp(false)
  }

  const handlePopUpMod = id => {
    setModId(id)
    handlePopUpBg()
    modPopUp === false ? setModPopUp(true) : setModPopUp(false)
  }

  const handlePopUpView = id => {
    setModId(id)
    handlePopUpBg()
    viewPopUp === false ? setViewPopUp(true) : setViewPopUp(false)
  }

  const handleActionMod = () => {
    setViewPopUp(false)
    handlePopUpBg()
    modPopUp === false ? setModPopUp(true) : setModPopUp(false)
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        triggered,
        setTriggered,
        addPopUp,
        setAddPopUp,
        modPopUp,
        setModPopUp,
        modId,
        handlePopUpAdd,
        handlePopUpMod,
        handlePopUpView,
        handleActionMod,
        viewPopUp,
        setViewPopUp
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
