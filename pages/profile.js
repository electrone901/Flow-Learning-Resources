import {
  Button,
  Input,
  Text,
  Link as ChakraLink,
  VStack,
  HStack,
  Image,
  Box,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import withTransition from '../components/withTransition'
import { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import styles from '../styles/Profile.module.css'
import PartnerCard from '../components/PartnerCard'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Profile({ user }) {
  const router = useRouter()
  const [fetchedUser, setFetchedUser] = useState()
  const [fetchedQuests, setFetchedQuests] = useState([])
  const [isQuestsLoading, setQuestsLoading] = useState(false)
  const [isUserLoading, setUserLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  // const fetchUser = useCallback(async () => {
  //   if (!address) return
  //   setUserLoading(true)
  //   try {
  //     const response = await fetch(`${JOURNEY_API_URL}/api/users/${address}`)
  //     if (response.status === 200) {
  //       const user = await response.json()
  //       setFetchedUser(user)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  //   setUserLoading(false)
  // }, [address])

  function handleUsernameChange(e) {
    e.preventDefault()
    setNewUsername(e.target.value)
  }

  // useEffect(() => {
  //   if (!fetchedUser) {
  //     fetchUser()
  //   }
  //   if (fetchedQuests.length === 0) {
  //     fetchQuests()
  //   }
  // }, [fetchQuests, fetchUser, fetchedQuests, fetchedUser])

  useEffect(() => {
    if (user.loggedIn) {
    } else {
      alert('Please connect your wallet to Flow Network!')
      router.push('/')
    }
  }, [])

  // if (isUserLoading || isQuestsLoading)
  // return (
  //   <VStack className={styles.loadingContainer}>
  //     <Spinner color="white" size="xl" />
  //   </VStack>
  // )

  const data = [
    {
      image:
        'https://img.freepik.com/premium-vector/funny-cartoon-emoji-design-happy-smile-face-vector-illustration-new-nft-collection_155957-1298.jpg?w=2000',
      name: 'Aleo Basics',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/4c0476f6-5e01-42d4-b5a2-3ae9a4d5b90a/original.jpeg',
      name: 'Aleo Smart Contracts',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Medium',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwwTQ8KyDbviaaR3nR5uDHEnB2pxEr0gWQA&usqp=CAU',
      name: 'Hello World Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Advanced',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      name: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      name: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      name: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      nft_reward: '0.99 USDC',
      nft_badge_img: '',
      points: '100LE',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },

    // IPFS => json upload it to it & store cid on the contract
    // quizes,
    // 1 questions
    //   - multi choice
    //   - correct answer

    // bounties -  challenges
    // tutorials: github_link
  ]

  function handleClick(task) {
    console.log('1 task', task)
    // setSelectedTask(task)
    // router.push('/quest/V2zbf8iYGGGzFnkXQ6tB')
  }

  return (
    <VStack pt="9rem" pb="9rem">
      <Image
        style={{
          border: '3px solid white',
          borderRadius: '50%',
          width: '127px',
          height: '130px',
        }}
        src="https://pbs.twimg.com/media/Fbg3zilXkAEvyrb?format=jpg&name=large"
        alt="userImage"
      />
      <div className={styles.profileItem}>
        <p className={styles.profileParaghap}>Task completed: 100 </p>
        <p className={styles.profileParaghap}>
          {user.addr}
          <CopyIcon style={{ marginLeft: '.8rem' }} />
        </p>
      </div>

      <section id="task">
        <h1
          style={{
            color: 'white',
            fontSize: '1.4rem',
            paddingTop: '2rem',
          }}
        >
          Suggested Quest Tasks to increased your reputation and points.
        </h1>

        <SimpleGrid columns={2} gap={5} pt={10}>
          {data.map((task, idx) => (
            <PartnerCard task={task} key={idx} handleClick={handleClick} />
          ))}
        </SimpleGrid>
      </section>
    </VStack>
  )
}

export default withTransition(Profile)
