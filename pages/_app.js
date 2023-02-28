import '../styles/globals.css'
import withTransition from '../components/withTransition'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withTransition(MyApp)
