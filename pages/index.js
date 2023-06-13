import {
  Text,
  VStack,
  SimpleGrid,
  Spinner,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as fcl from '@onflow/fcl'
import '../flow/config.js'
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from '@gelatonetwork/gasless-onboarding'

export default function Home({ Component, pageProps, router }) {
  const [user, setUser] = useState({ loggedIn: false })
  const [greeting, setGreeting] = useState('')
  const [newGreeting, setNewGreeting] = useState('')

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
  }, [])

  async function mylogin() {
    const gaslessWalletConfig = {
      apiKey: 'KP1FEqk_oaJpGhrGPD5f4QCzVFB3oIJN_nNbJmIUSHE_',
    }
    const loginConfig = {
      domains: ['http://localhost:3000/'],
      chain: {
        id: 5,
        rpcUrl:
          'https://eth-goerli.g.alchemy.com/v2/wfmZ5V7AL4unxjEHUIfgeSAlxX3Pl0fx',
      },
      openLogin: {
        redirectUrl: `http://localhost:3000/`,
      },
    }
    const gaslessOnboarding = new GaslessOnboarding(
      loginConfig,
      gaslessWalletConfig,
    )
    console.log(
      '🚀 ~ file: index.js:52 ~ mylogin ~ gaslessOnboarding:',
      gaslessOnboarding,
    )
    await gaslessOnboarding.init()
    const web3AuthProvider = await gaslessOnboarding.login()
    console.log('🚀web3AuthProvider:', web3AuthProvider)

    const gaslessWallet = gaslessOnboarding.getGaslessWallet()
    const address = gaslessWallet.getAddress()
    console.log('🚀 ~ file: index.js:63 ~ mylogin ~ address:', address)
  }

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

    console.log('🚀 ~ file: index.js:32 ~ getGreeting ~ result:', result)
    // create quiz
    // now get it from IPFS,  and display everry task
    //
    setGreeting(result)
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

  function getStarted(e) {
    // const router = useRouter()
    // e.preventDefault()
    // router.push('/tasks')
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.showcase}>
          <div className={styles.showcaseContent}>
            <h1>Learning rewards is simple, educational, and rewarding.</h1>
            <p></p>
            <p>Learn and earn tokens, NFTS, and Experience points.</p>

            <Button onClick={mylogin}>mylogin</Button>

            <Button
              fontSize={'bg'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={getStarted}
            >
              Get Started Now
            </Button>
          </div>
        </div>

        {/*  */}

        {/* <ProjectDetails /> */}
        {/* old */}

        {/* HOW IT WORKS*/}
        <Center py={12}>
          <Flex minWidth="max-content" alignItems="center" gap="6">
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  // backgroundImage: `url(https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg)`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src="./group0.png"
                  alt="user"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  color={'gray.500'}
                >
                  Join Our Community
                </Heading>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  Discovery is dedicated space for your community to come
                  together, ask and answer questions, and have open-ended
                  conversations.
                </Text>

                <Stack direction={'row'} align={'center'}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'black'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={getStarted}
                  >
                    Explore Tasks
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  // backgroundImage: `url(https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg)`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src="./group1.png"
                  alt="user"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  color={'gray.500'}
                >
                  Learn And Earn
                </Heading>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  Just by reading blogs about crypto and completing a short
                  quiz, eligible users will be rewarded with a bit of that
                  specific crypto!
                </Text>

                <Stack direction={'row'} align={'center'}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'black'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={getStarted}
                  >
                    Join Discord
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  // backgroundImage: `url(https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg)`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src="./group2.png"
                  alt="user"
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  color={'gray.500'}
                >
                  Create Content & Earn
                </Heading>
                <Text
                  textAlign={'center'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  px={3}
                >
                  When you completed a few tasks, you will be ready to start
                  creating quizz, tutorial and more. Eligible users will be
                  rewarded!
                </Text>

                <Stack direction={'row'} align={'center'}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'black'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={getStarted}
                  >
                    Create a Tasks
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Center>
        <Image objectFit={'cover'} src="./lear.png" alt="user" pt={8} />
      </main>
    </div>
    // <div className="bg-[#011E30] flex flex-col min-h-screen">
    // <main className="container mx-auto flex-1 p-5">
    // {
    /* <div className=" items-center justify-center pt-28">
        <div className="space-y-5 p-2 w-1/3">
          <button
            onClick={getGreeting}
            className="border rounded-lg py-2 text-sm px-5 border-[#38E8C6] text-blue-900 font-bold bg-[#38E8C6]"
          >
            Get Greeting
          </button>
          <div className="h-28 bg-[#00344B] border flex items-center justify-center text-white border-[#38E8C6] rounded-lg">
            {greeting}
          </div>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Goodbye, World!"
              className="px-4 py-1 focus:outline-none focus:border-[#38E8C6] focus:border-2 bg-green-100 border rounded-lg border-[#38E8C6]"
              onChange={(e) => setNewGreeting(e.target.value)}
            />
            <button
              className="rounded-lg text-center text-sm font-bold text-blue-900 py-2 bg-[#38E8C6]"
              onClick={addTask}
              // onClick={changeGreeting}
            >
              addTask
            </button>
          </div>
        </div>
      </div> */
    // }
    // </main>
    // </div>
  )
}
