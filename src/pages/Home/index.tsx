/* eslint-disable no-unused-vars */
import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
  }
  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }
  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)
  //   reset()
  // }
  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSbumitDisabeled = !task

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            Interropenter
            <HandPalm size={24} />
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            /* disabled={isSbumitDisabeled} */ type="submit"
          >
            Começar
            <Play size={24} />
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
