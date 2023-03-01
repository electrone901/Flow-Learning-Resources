import '../styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
// import styles from '../styles/Home.module.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import * as fcl from '@onflow/fcl'
import '../flow/config.js'
import withTransition from '../components/withTransition'

const theme = extendTheme({
  styles: {
    global: {
      'html,body': {
        backgroundColor: '#000113',
      },
      '*': {
        color: 'white',
        backgroundColor: 'transparent',
      },
      button: {
        backgroundColor: 'transparent !important',
        border: '1px solid gray',
        _hover: {
          border: '1px solid lightgray',
        },
      },
    },
  },
})

function MyApp({ Component, pageProps, router }) {
  const [user, setUser] = useState({ loggedIn: false })
  const [selectedTask, setSelectedTask] = useState('')
  const [greeting, setGreeting] = useState('')
  const [newGreeting, setNewGreeting] = useState('')
  const [
    isQuestSuccessfullycompleted,
    setIsQuestSuccessfullycompleted,
  ] = useState(false)

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
    fcl
      .config()
      .put('flow.network', 'testnet')
      .put('accessNode.api', 'https://rest-testnet.onflow.org')
      .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
      .put('app.detail.title', 'Flow Bounty Hunter')
      .put('app.detail.icon', 'https://i.imgur.com/r23Zhvu.png')
      .put('0xFlowToken', '0x7e60df042a9c0868')
  }, [])

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

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Flow Learning Resources</title>
        <meta name="description" content="Used by Emerald Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <Component
        {...pageProps}
        key={router}
        user={user}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        isQuestSuccessfullycompleted={isQuestSuccessfullycompleted}
        setIsQuestSuccessfullycompleted={setIsQuestSuccessfullycompleted}
      />
      <Footer />
    </ChakraProvider>
  )
}

export default withTransition(MyApp)
