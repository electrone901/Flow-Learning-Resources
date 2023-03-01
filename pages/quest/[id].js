import {
  VStack,
  Text,
  HStack,
  Button,
  Image,
  useToast,
  Box,
  Spinner,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Quiz from '../../components/Quiz'
import styles from '../../styles/Quest.module.css'
import withTransition from '../../components/withTransition'
import Confetti from 'react-confetti'

function Quest({
  selectedTask,
  isQuestSuccessfullycompleted,
  setIsQuestSuccessfullycompleted,
}) {
  return (
    <VStack className={styles.container}>
      <Quiz
        selectedTask={selectedTask}
        setIsQuestSuccessfullycompleted={setIsQuestSuccessfullycompleted}
      />
      {isQuestSuccessfullycompleted && (
        <Confetti width={1450} height={1000} numberOfPieces={100} />
      )}
    </VStack>
  )
}

export default withTransition(Quest)
