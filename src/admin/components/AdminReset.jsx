import { useState, useContext } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { relog } from '../services/AuthApi'
import { changeCredentials } from '../services/ModifyCredentials'
import AdminContext from '../contexts/AdminContext'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

const AdminReset = () => {
  const { triggered, setTriggered } = useContext(AdminContext)
  //Activer/Désactiver visibilité du password
  const [visiblePass, setVisiblePass] = useState(false)
  const [relogged, setRelogged] = useState(false)
  const [icon, setIcon] = useState(false)
  //Message d'alerte en cas de mauvais identifiants à la confirmation d'identité
  const [warn, setWarn] = useState(false)
  //Confirmation des modifications identifiants
  const [confirmed, setConfirmed] = useState(false)
  //Récupération des infos entrées par l'utilisateur
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleClick = () => {
    setVisiblePass(!visiblePass)
    setIcon(!icon)
  }

  const handleOutsideClick = () => {
    setTriggered(false)
    setRelogged(false)
  }

  const submitChange = async e => {
    e.preventDefault()
    changeCredentials(user)
    setConfirmed(true)
    setTimeout(() => {
      setTriggered(false)
      setRelogged(false)
      setConfirmed(false)
    }, 1500)
  }

  const submitLogin = async e => {
    e.preventDefault()
    try {
      const response = await relog(user)
      setWarn(false)
      setRelogged(response)
      setUser({ ...user, password: '' })
    } catch ({ response }) {
      console.log(response)
      setWarn(true)
    }
  }

  const formBgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0.4 },
    exit: { opacity: 0 }
  }

  return (
    <>
      {triggered && (
        <motion.div
          className='adminReset'
          variants={formBgVariants}
          initial='hidden'
          animate='visible'
          transition='transition'
          exit='exit'
        >
          {relogged ? (
            <div>
              <div
                className='resetFormOutside'
                onClick={() => handleOutsideClick()}
              ></div>
              <form className='resetForm'>
                <h1 className='resetFormTitle'>
                  Mettre à jour les identifiants
                </h1>
                <label htmlFor='email'>Email : </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  required
                />
                <label htmlFor='password'>Mot de passe : </label>
                <div className='passwordField'>
                  <input
                    type={visiblePass ? 'text' : 'password'}
                    name='password'
                    id='password'
                    value={user.password}
                    onChange={e =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                  {icon ? (
                    <VisibilityOutlinedIcon
                      className='visibility'
                      onClick={() => handleClick()}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      className='visibility'
                      onClick={() => handleClick()}
                    />
                  )}
                </div>
                {confirmed && (
                  <motion.div
                    className='confirmedContainer'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskAltIcon className='confirmedIcon' />
                    <p className='warn'>Modifications enregistrées</p>
                  </motion.div>
                )}
                <button
                  value='Se connecter'
                  className='submit'
                  onClick={e => submitChange(e)}
                >
                  Envoyer
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div
                className='resetFormOutside'
                onClick={() => handleOutsideClick()}
              ></div>
              <form className='resetForm'>
                <h1 className='resetFormTitle'>
                  Veuillez confirmer votre identité
                </h1>
                <label htmlFor='email'>Email : </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  required
                />
                <label htmlFor='password'>Mot de passe : </label>
                <div className='passwordField'>
                  <input
                    type={visiblePass ? 'text' : 'password'}
                    name='password'
                    id='password'
                    value={user.password}
                    onChange={e =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                  {icon ? (
                    <VisibilityOutlinedIcon
                      className='visibility'
                      onClick={() => handleClick()}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      className='visibility'
                      onClick={() => handleClick()}
                    />
                  )}
                </div>
                {warn && (
                  <motion.div
                    className='warnContainer'
                    initial={{ x: 0 }}
                    animate={{ x: [10, 0, 10, 0, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <AnnouncementIcon className='warnIcon' />
                    <p className='warn'>Identifiants incorrects</p>
                  </motion.div>
                )}
                <button
                  value='Se connecter'
                  className='submit'
                  onClick={e => submitLogin(e)}
                >
                  Se Connecter
                </button>
              </form>
            </div>
          )}
        </motion.div>
      )}
    </>
  )
}

export default AdminReset
