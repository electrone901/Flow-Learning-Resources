import Link from 'next/link'

import styles from '../styles/Navbar.module.css'
import { Button, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react'
// import { useTron } from './TronProvider'
// import { abridgeAddress } from '@utils/abridgeAddress'
import { useState, useContext, useEffect } from 'react'
// import { handleDisconnect } from '@utils/web3'
import { useRouter } from 'next/router'
import * as fcl from '@onflow/fcl'
// import { MyAppContext } from '../pages/_app'

const Navbar = ({ user, serUser, userUD }) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)
  const [isHoverUD, setIsHoverUD] = useState(false)
  const [isLoading, setLoading] = useState(false)

  // const { setUserUD } = useContext(MyAppContext)

  // if (!account) return

  // function handleNavigate() {
  //   router.push('/')
  // }

  function onClickDisconnect() {
    console.log(
      '🚀 ~ file: Navbar.js:28 ~ onClickDisconnect ~ onClickDisconnect:',
    )
    if (user.loggedIn) {
      fcl.unauthenticate()
    } else {
      fcl.authenticate()
    }

    // setAccount(undefined)
    // router.push('/')
  }

  const userLogOut = () => {
    // setUserUD('')
  }

  // useEffect(() => {
  //   fcl.currentUser().subscribe(setUser)
  // }, [])

  return (
    <HStack className={styles.navbarContainer}>
      <VStack w="100%">
        <HStack className={styles.navbar}>
          <Link href="/">
            <Image
              src="/logo2.png"
              alt="Logo"
              cursor="pointer"
              className={styles.logo}
            ></Image>
          </Link>

          <HStack className={styles.navLeftSection}>
            <Link href="/tasks">
              <Text className="text-[#38E8C6]">Tasks</Text>
            </Link>

            <Link href="/create">
              <Text>Create Tasks</Text>
            </Link>
            <Link href="/profile">
              <Text>My Profile</Text>
            </Link>
            <Link href="/community">
              <Text>Leaderboard</Text>
            </Link>

            {user.loggedIn && (
              <Button
                className={styles.addressPill}
                onClick={onClickDisconnect}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {isLoading ? (
                  <Spinner color="white" />
                ) : isHover ? (
                  'Disconnect Wallet'
                ) : (
                  `${user.addr}`
                )}
              </Button>
            )}

            {!user.loggedIn && (
              <Button
                className={styles.addressPill}
                onClick={onClickDisconnect}
              >
                Log In
              </Button>
            )}
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default Navbar
