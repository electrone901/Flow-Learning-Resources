import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import * as fcl from '@onflow/fcl'
import '../flow/config.js'

export default function Home({ Component, pageProps, router }) {
  const [user, setUser] = useState({ loggedIn: false })
  const [greeting, setGreeting] = useState('')
  const [newGreeting, setNewGreeting] = useState('')

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
  }, [])

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

  return (
    <ChakraProvider>
      <div className="bg-[#011E30] flex flex-col min-h-screen">
        <Head>
          <title>Flow Learning Resources</title>
          <meta name="description" content="Used by Emerald Academy" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar user={user} />
        <br />
        <br />

        {/* <Component {...pageProps} key={router} /> */}
        <Component {...pageProps} key={router} />
        <main className="container mx-auto flex-1 p-5">
          <div className="flex items-center justify-center pt-28">
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
                  {/* Change Greeting */}
                  addTask
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <img className="w-full" src="/city.svg" alt="city" />
          <div className="bg-black flex pt-10 pb-5 justify-center text-white">
            <div className="w-[80%] flex justify-between items-center">
              <div className="font-jet text-xs">2022. All rights reserved.</div>
              <a
                className="flex items-center text-[#38E8C6] hover:underline hover:underline-offset-2 space-x-1 font-poppins text-lg"
                href="https://academy.ecdao.org/"
              >
                <h1>Emerald</h1>
                <img src="/EC_Education.png" width={40} alt="city" />
                <h1>Academy</h1>
              </a>
              <div className="font-jet text-xs">
                Created by{' '}
                <a
                  href="https://discord.gg/emeraldcity"
                  className="text-[#38E8C6] hover:underline hover:underline-offset-2 "
                >
                  Emerald City DAO
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ChakraProvider>
  )
}
