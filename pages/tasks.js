import { useState, useContext, useEffect } from 'react'
import { Text, SimpleGrid, Alert } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import withTransition from '../components/withTransition'
import { MyAppContext } from './_app'
import PartnerCard from '../components/PartnerCard'
import * as fcl from '@onflow/fcl'
import '../flow/config.js'

function Explore({ user, setSelectedTask }) {
  const router = useRouter()
  const [allTasks, setAllTasks] = useState([])
  const [greeting, setGreeting] = useState('')
  console.log('🚀 ~ file: tasks.js:16 ~ Explore ~ greeting:', greeting)
  const [newGreeting, setNewGreeting] = useState('')

  useEffect(() => {
    if (user.loggedIn) {
      getGreeting()
    } else {
      alert('Please connect your wallet to Flow Network!')
      router.push('/')
    }
  }, [])

  const dataDummy = [
    {
      image:
        'https://img.freepik.com/premium-vector/funny-cartoon-emoji-design-happy-smile-face-vector-illustration-new-nft-collection_155957-1298.jpg?w=2000',
      title: 'Aleo Basics',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      reward: '0.99 USDC',
      nft_badge_img: '',
      experiencePoint: '100',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/4c0476f6-5e01-42d4-b5a2-3ae9a4d5b90a/original.jpeg',
      title: 'Aleo Smart Contracts',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      reward: '0.99 USDC',
      nft_badge_img: '',
      experiencePoint: '100',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Medium',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwwTQ8KyDbviaaR3nR5uDHEnB2pxEr0gWQA&usqp=CAU',
      title: 'Hello World Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo.',
      reward: '0.99 USDC',
      nft_badge_img: '',
      experiencePoint: '100XP',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Advanced',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      title: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      reward: '0.99 USDC',
      nft_badge_img: '',
      experiencePoint: '100XP',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      title: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      reward: '0.99 USDC',
      nft_badge_img: '',
      experiencePoint: '100XP',
      creator: '',
      material: 'json',
      completed_users: [],
      id: 1,
      level: 'Beginner',
    },
    {
      image:
        'https://media.nft.crypto.com/5908fada-92da-4b61-b34a-bfe8153bad39/original.png?d=sm-cover',
      title: 'Advance Aleo!',
      description:
        'Aleo Basics concepts to get started in your journey with Aleo. s Marieke mentioned recently that we need to go back to real utility, especially in the current turmoil. Our goal is to solve a long-lasting pain: Recruitment, that exists in all companies, with web3 technology',
      reward: '0.99 USDC',
      nft_badge_img: '',
      experiencePoint: '100XP',
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

  async function getGreeting() {
    const result = await fcl.query({
      cadence: `
      import TasksList from 0xDeployer

      pub fun main(): [String] {
        return TasksList.tasks
      }
      `,
      args: (arg, t) => [],
    })
    // create quiz
    // now get it from IPFS,  and display everry task
    //
    const newArray = result.slice(6)
    const allTasks = getAllTasks(newArray)
  }

  const getAllTasks = async (newArray) => {
    const data = []

    for (let i = 0; i < newArray.length; i++) {
      const obj = {}

      const IPFSCid = newArray[i]
      let getNFTStorageData = await fetch(IPFSCid)
      let temp = await getNFTStorageData.json()
      const task = JSON.parse(temp.description)
      console.log('🚀___________description', task)
      obj.owner = task.creator
      obj.reward = task.rewardAmount
      obj.description = task.description
      obj.experiencePoint = task.experiencePoint
      obj.image = task.image
      obj.level = task.level
      obj.questionsArray = task.questionsArray
      obj.rewardAmount = task.rewardAmount
      obj.subscriptionFee = task.subscriptionFee
      obj.title = task.title
      data.unshift(obj)
    }
    setAllTasks(data)
  }

  async function addTask() {
    const transactionId = await fcl.mutate({
      cadence: `
      import TasksList from 0xDeployer
      transaction(newURL: String) {
        prepare(signer: AuthAccount) {
        }
        execute {
          TasksList.addTask(newURL: newURL)
        }
      }
      `,
      args: (arg, t) => [arg(newGreeting, t.String)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    })

    console.log('Transaction Id IS THIS ONE', transactionId)
  }

  async function changeGreeting() {
    const transactionId = await fcl.mutate({
      cadence: `
      import HelloWorld from 0xDeployer

      transaction(newGreeting: String) {
        prepare(signer: AuthAccount) {

        }

        execute {
          HelloWorld.changeGreeting(newGreeting: newGreeting)
        }
      }
      `,
      args: (arg, t) => [arg(newGreeting, t.String)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    })

    console.log('Transaction Id', transactionId)
  }

  function handleClick(task) {
    console.log('1 task', task)
    setSelectedTask(task)
    router.push('/quest/V2zbf8iYGGGzFnkXQ6tB')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Text className={styles.title}>Explore Partners</Text>
        <SimpleGrid columns={2} gap={5} pt={10}>
          {allTasks?.length > 0 ? (
            allTasks.map((task, idx) => (
              <PartnerCard task={task} key={idx} handleClick={handleClick} />
            ))
          ) : (
            <h2>Loading....</h2>
          )}
        </SimpleGrid>
        <br />
        <br />
        <br />
        <Text className={styles.title}>Test Data</Text>
        <SimpleGrid columns={2} gap={5} pt={10}>
          {dataDummy?.length > 0 ? (
            dataDummy.map((task, idx) => (
              <PartnerCard task={task} key={idx} handleClick={handleClick} />
            ))
          ) : (
            <h2>Loading....</h2>
          )}
        </SimpleGrid>
      </main>
    </div>
  )
}

export default withTransition(Explore)
