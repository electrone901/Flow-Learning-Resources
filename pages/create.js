import {
  Box,
  Button,
  useColorModeValue,
  VStack,
  Spinner,
  useToast,
  Text,
  Input,
} from '@chakra-ui/react'
import { NFTStorage, File } from 'nft.storage'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toastCreateTaskSuccess } from '../utils/toast'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import CreateContentFirstPart from '../components/CreateContentFirstPart'
import withTransition from '../components/withTransition'
import { apiKey } from '../components/APIKEYS'
import * as fcl from '@onflow/fcl'
import '../flow/config.js'

const CustomeInput = ({ setTempOption }) => {
  return (
    <div style={{ paddingLeft: '3rem', paddingTop: '1rem', width: '80%' }}>
      <Input
        onChange={(e) => setTempOption(e.target.value)}
        placeholder="Option"
        size="sm"
      />
    </div>
  )
}

function Create({ user }) {
  // const { account, contract } = useContext(MyAppContext)
  const dummyData = [
    {
      question: 'What is Flow?',
      answers: [
        'Proof of Stake',
        'Sharding',
        'Coffe Beans',
        'Data Availability',
      ],
      correct: 1,
    },
    {
      question: 'Flow is what kind of blockchain?',
      answers: ['Layer 0', 'Layer 1', 'Layer 3', 'Layer 4'],
      correct: 2,
    },

    {
      question:
        'What are the four phases Flow split the miner/validator role into?',
      answers: [
        'Collection - Retention - Execution - Verification',
        'Collection - Consensus - Expectation - Validation',
        'Collection - Consensus - Execution - Verification',
        'Collection - Collection - Expectation - Collection',
      ],
      correct: 3,
    },
  ]
  const [creatingQuiz, setCreatingQuiz] = useState(false)
  //   - show success

  // First part
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  const [experiencePoint, setExperiencePoint] = useState('')
  const [subscriptionFee, setSubscriptionFee] = useState('')
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setLoading] = useState(false)
  const [tx, setTx] = useState('')

  // Second part
  const [data, setData] = useState([])
  const [showFirstPart, setShowFirstPart] = useState(true)
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [option1, setOption1] = useState('')
  const [tempOption, setTempOption] = useState('')
  const [optionArray, setOptionArray] = useState([])
  const [optionList, setOptionList] = useState([])

  const SaveAllAndPublish = async () => {
    if (user.loggedIn) {
      try {
        setCreatingQuiz(true)
        setLoading(true)
        const rewardAmountInt = Number(rewardAmount)
        const subscriptionFeeInt = Number(subscriptionFee)

        const obj = {
          image: image
            ? image
            : 'https://images.unsplash.com/photo-1534705867302-2a41394d2a3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',

          title: title ? title : 'Understanding the concepts behind Flow',
          description: description
            ? description
            : 'Gas fees and smart contract security can present a huge challenge for you. If you do not write your code perfectly the first time, you will not be able to change it later: This presents a massive security risk.',
          rewardAmount: rewardAmount ? rewardAmount : '0.00',
          experiencePoint: experiencePoint ? experiencePoint : '100',
          level: level ? level : 1,
          creator: user.addr ? user.addr : '0xb74a263c8ad544b5',
          subscriptionFee: subscriptionFee ? subscriptionFee : '0.00',
          questionsArray: data ? data : dummyData,
        }

        const client = new NFTStorage({ token: apiKey })
        const metadata = await client.store({
          name: title ? title : 'Getting Started with Klaynt Basics',
          description: JSON.stringify(obj),
          image: new File([image], 'imageName', { type: 'image/*' }),
        })

        if (metadata) {
          const url = metadata?.url.substring(7)
          const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`
          console.log('fullUrl', fullUrl)
          const isProject = false
          const arrayAnswers = [1, 4, 1]

          const saveToContract = addTask(fullUrl)

          //  await contract.addTask(
          //   fullUrl,
          //   rewardAmountInt,
          //   subscriptionFeeInt,
          //   isProject,
          //   arrayAnswers,
          //   { value: ethers.utils.parseEther(rewardAmount) },
          // )

          // const tx = await saveToContract.wait()
          // if (tx?.to) {
          //   console.log('___tx__', tx)
          //   const transationId = tx?.to
          //   console.log('transationId', transationId)
          //   const event = contract.on('taskAdded')
          //   console.log(event)
          //   router.push('/tasks')
          // }

          // on  success display a button 'See Transaction'
          //  href https://baobab.scope.klaytn.com/tx/ + txID 0x014ce3aa8bd20739287837f03d7319159310028e21a6b43f8b90a9ea540279a8
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Please connect your wallet to Flow Network!')
      router.push('/')
    }
  }

  const addTask = async (fullUrl) => {
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
      args: (arg, t) => [arg(fullUrl, t.String)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    })

    console.log('Transaction Id IS THIS ONE', transactionId)
    if (transactionId) {
      const txLink = `https://flow-view-source.com/testnet/tx/${transactionId}`
      setTx(txLink)
      setLoading(false)
      toastCreateTaskSuccess(toast)
    }
  }

  const saveQuestion = (e) => {
    e.preventDefault()
    // make sure tempOption is not empty
    if (tempOption !== '') {
      // then push the current option & reset setTempOption
      optionArray.push(tempOption)
      setTempOption('')
    }

    //  create cur obj
    const obj = {
      question: question,
      answers: optionArray,
      correct: correctAnswer,
    }
    console.log('saveQuestion ~ obj', obj)
    // push it to setData
    setData([...data, obj])
    setQuestion('')
    setOptionArray([])
    setCorrectAnswer('')
    setTempOption('')
    setOptionList([])
  }

  const onAddBtnClick = (e) => {
    // first check tempOption not empty
    if (tempOption === '') {
      alert('Option cannot be blank!')
      return
    }

    // then push the current option & reset setTempOption
    optionArray.push(tempOption)
    setTempOption('')

    // to display all options
    setOptionList(
      optionList.concat(
        <CustomeInput
          e={e}
          tempOption={tempOption}
          setTempOption={setTempOption}
          key={optionList.length}
        />,
      ),
    )
  }

  return (
    <div style={{ padding: '10rem 10rem ' }}>
      <Box style={{ padding: '1rem', fontSize: '2.2rem' }}>
        <Text
          className={styles.title}
          style={{ paddingTop: '3rem', fontSize: '2.2rem' }}
        >
          Create your quiz and give incentives to resolve it.
        </Text>
        <Text
          className={styles.title}
          style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
        >
          All the subscription fee is added to the reward pool.
        </Text>
      </Box>

      <div style={{ display: 'flex' }}>
        <Box bg="gray" w="50%" p={10} color="white" minHeight="50rem">
          {showFirstPart ? (
            <CreateContentFirstPart
              setShowFirstPart={setShowFirstPart}
              setTitle={setTitle}
              setImage={setImage}
              image={image}
              setDescription={setDescription}
              setLevel={setLevel}
              setRewardAmount={setRewardAmount}
              setExperiencePoint={setExperiencePoint}
              setSubscriptionFee={setSubscriptionFee}
            />
          ) : (
            <>
              {/* SECOND PART */}
              <Text mb="8px">Question</Text>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                size="md"
              />

              <div
                style={{
                  paddingLeft: '3rem',
                  paddingTop: '.5rem',
                  width: '80%',
                }}
              >
                <Text mb="8px">Correct Answer</Text>
                <Input
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeContent="Answer"
                  size="sm"
                />
              </div>

              <div
                style={{
                  paddingLeft: '3rem',
                  paddingTop: '1rem',
                  width: '80%',
                }}
              >
                <Text mb="8px">Options</Text>
                <Input
                  onChange={(e) => setTempOption(e.target.value)}
                  placeContent="Option"
                  size="sm"
                />
              </div>

              {optionList}
              <button
                onClick={onAddBtnClick}
                style={{ marginLeft: '3rem', marginTop: '0.5rem' }}
              >
                + Add Option
              </button>
              <br />
              <br />

              <button
                onClick={saveQuestion}
                className={styles.savePost}
                style={{ marginTop: '0.5rem', padding: '1rem' }}
              >
                Save Question
              </button>
              <br />
              <br />

              <Button
                className={styles.btnBack}
                variant="outline"
                onClick={() => setShowFirstPart(true)}
              >
                Back
              </Button>
              <Button
                className={styles.savePost}
                variant="outline"
                onClick={SaveAllAndPublish}
              >
                Save All & Publish
              </Button>
              <br />
              <br />

              {isLoading ? (
                <VStack className={styles.loadingContainer}>
                  <Spinner color="white" size="xl" />
                  <p>Uploading....</p>
                </VStack>
              ) : (
                ''
              )}
              {tx && (
                <div
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '3rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '1.2rem',
                      color: 'black',
                    }}
                  >
                    🎉 Congratulations... We have successfully created your
                    quest task.
                  </p>
                  <a
                    href={tx}
                    target="_blank"
                    rel="noreferrer"
                    className="pt-4 underline decoration-sky-900"
                  >
                    See Transaction Details
                  </a>
                </div>
              )}
            </>
          )}
        </Box>

        <Box
          bg="#5b10ff"
          w="50%"
          p={40}
          color="white"
          style={{ paddingTop: '3rem' }}
        >
          {data.length ? (
            data.map((question, idx) => (
              <div
                key={idx}
                style={{
                  paddingBottom: '1rem',
                }}
              >
                <h1
                  style={{
                    color: 'white',
                    fontSize: '1.3rem',
                  }}
                >
                  {`${idx + 1}.-`} {question.question}
                </h1>

                {question.answers
                  ? question.answers.map((answer, idx) => (
                      <p key={idx} style={{ paddingLeft: '.5rem' }}>
                        {`${idx + 1}.-`} {answer}
                      </p>
                    ))
                  : ''}
              </div>
            ))
          ) : (
            <h1
              style={{
                color: 'white',
                fontSize: '1.3rem',
              }}
            >
              Your quiz will display here!
            </h1>
          )}
        </Box>
      </div>
    </div>
  )
}

export default withTransition(Create)
