import { useMachine } from '@xstate/react'
import { useState } from 'react'
import coffeeMachine from './coffeemachine'
import {
  CoffeeButton,
  CoffeeButtons,
  CoffeeMachine,
  Display,
  PowerButton,
  WaterReservoir,
} from './components'

const App = () => {
  const [state, send] = useMachine(coffeeMachine)

  const isOn = state.matches('poweredOn')

  return (
    <>
      <h1>My Coffee Machine</h1>

      <CoffeeMachine reservoirInMachine={state.context.reservoirInMachine}>
        <PowerButton isOn={isOn} toggle={() => send('TOGGLE_POWER')} />

        <Display isOn={isOn}>{state.context.displayText}</Display>

        <CoffeeButtons>
          <CoffeeButton disabled={!state.matches('poweredOn.ready')}>Ristretto</CoffeeButton>
          <CoffeeButton disabled={!state.matches('poweredOn.ready')}>Espresso</CoffeeButton>
          <CoffeeButton disabled={!state.matches('poweredOn.ready')}>Lungo</CoffeeButton>
        </CoffeeButtons>

        <WaterReservoir
          contents={30}
          reservoirInMachine={state.context.reservoirInMachine}
          toggleReservoirInMachine={() => send('TOGGLE_WATER_RESERVOIR')}
          fill={() => {}}
        />
      </CoffeeMachine>

      <div style={{ border: '3px dashed pink', padding: '3px', margin: '10px' }}>
        <div>STATE: {JSON.stringify(state.value)}</div>
        <div>CONTEXT: {JSON.stringify(state.context)}</div>
      </div>
    </>
  )
}

export default App
