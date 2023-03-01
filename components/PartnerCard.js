import { Text, VStack, HStack, Image, Box, SimpleGrid } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import RewardPill from './RewardPill'

export default function QuestCard({ task, handleClick, isLocked }) {

  return (
    <HStack
      className={isLocked ? styles.lockedQuest : styles.questCard}
      onClick={() => handleClick(task)}
    >
      <VStack alignItems="flex-start" gap={3} opacity={isLocked ? 0.55 : 1}>
        <HStack>
          <Image
            borderRadius="full"
            boxSize="120px"
            src={task.image ? task.image : '/coin.svg'}
            alt="Bounty image"
          />

          <VStack alignItems="flex-start">
            <Text className={styles.title}>{task.title}</Text>
            <Text className={(styles.subtitle, styles.limitCharacters)}>
              {task.description}
            </Text>
            <HStack>
              <RewardPill imageUrl="/l.png" label={`Level: ${task.level}`} />
              <RewardPill
                imageUrl="/coin.png"
                label={`Rewards: ${task.reward} Flow`}
              />
              <RewardPill
                imageUrl="/badgeicon.png"
                label={`XP: ${task.experiencePoint}`}
              />
              <RewardPill imageUrl="/dollar.png" label={`Entry fee: Free`} />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  )
}
