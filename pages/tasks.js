import { useState, useContext, useEffect } from 'react'
import { Text, SimpleGrid } from '@chakra-ui/react'

import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import withTransition from '../components/withTransition'
import { MyAppContext } from './_app'
import PartnerCard from '../components/PartnerCard'

function Explore() {
  const router = useRouter()
  const [allTasks, setAllTasks] = useState([])

  const dummyQuests = [
    {
      title: 'DEX 101 with SunSwap',
      description:
        'Explore swapping, LPing on SunSwap, and staking on TRON with SunSwap',
      image_url: '/nft_sunswap.jpg',
    },
    {
      title: 'Stables on SunCurve',
      description: 'Swap from USDD to USDT on SunCurve Protocol',
      image_url: '/nft_suncurve.png',
    },
    {
      title: 'Governance on Sun',
      description: 'Participate in decentralized governance on SUN.io',
      image_url: '/nft_sungov.jpg',
    },
    {
      title: 'Lend on Justlend',
    },
    {
      title: 'Buy an NFT',
    },
    {
      title: 'Lend on JustStables',
    },
    {
      title: 'Swap on Sunswap',
    },
    {
      title: 'Swap on Sunswap',
    },
  ]
  // const {
  //   account,
  //   contract,
  //   allTasks,
  //   setAllTasks,
  //   setAccount,
  //   setSelectedTask,
  //   selectedTask,
  // } = useContext(MyAppContext)

  // useEffect(() => {
  //   const getAllTasks = async (contract) => {
  //     const data = []
  //     const allTasks = await contract.getAllTasks()
  //     console.log('🚀 ~ file: tasks.tsx:21 ~ getAllTasks ~ allTasks', allTasks)
  //     setAllTasks(allTasks)

  //     for (let i = 0; i < allTasks.length; i++) {
  //       const obj = {}
  //       const IPFSCid = allTasks[i].IPFSCid
  //       const completed = allTasks[i].completed
  //       const id = allTasks[i].id
  //       const owner = allTasks[i].owner
  //       const price = allTasks[i].price.toString()

  //       const weiValue = allTasks[i].reward.toString()
  //       const reward = ethers.utils.formatEther(weiValue)

  //       let getNFTStorageData = await fetch(IPFSCid)
  //       let temp = await getNFTStorageData.json()
  //       const task = JSON.parse(temp.description)
  //       obj.completed = completed
  //       obj.id = id
  //       obj.owner = owner
  //       obj.price = price
  //       obj.reward = reward
  //       obj.description = task.description
  //       obj.experiencePoint = task.experiencePoint
  //       obj.image = task.image
  //       obj.level = task.level
  //       obj.questionsArray = task.questionsArray
  //       obj.rewardAmount = task.rewardAmount
  //       obj.subscriptionFee = task.subscriptionFee
  //       obj.title = task.title
  //       data.unshift(obj)
  //     }
  //     setAllTasks(data)
  //   }
  //   if (account && contract) {
  //     getAllTasks(contract)
  //   }
  // }, [account, contract, setAllTasks])

  function handleClick(task) {
    // console.log('1 task', task)
    // setSelectedTask(task)
    // router.push('/quest/V2zbf8iYGGGzFnkXQ6tB')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Text className={styles.title}>Explore Partners</Text>
        <SimpleGrid columns={2} gap={5} pt={10}>
          {dummyQuests?.length > 0 ? (
            dummyQuests.map((task, idx) => (
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
