import { useState } from 'react'
import coffeeMachine from './coffeeMachine'
import {
  CoffeeButton,
  CoffeeButtons,
  CoffeeMachine,
  Display,
  PowerButton,
  WaterReservoir,
} from './components'

const App = () => {

  const [reservoirInMachine, setReservoirInMachine] = useState(true)

  const isOn = false

  return (
    <>
      <h1>My Coffee Machine</h1>

      <CoffeeMachine reservoirInMachine={reservoirInMachine}>
        <PowerButton isOn={isOn} toggle={() => {}} />

        <Display isOn={isOn}>
        </Display>

        <CoffeeButtons>
          <CoffeeButton disabled={false}>Ristretto</CoffeeButton>
          <CoffeeButton disabled={false}>Espresso</CoffeeButton>
          <CoffeeButton disabled={false}>Lungo</CoffeeButton>
        </CoffeeButtons>

        <WaterReservoir
          contents={30}
          reservoirInMachine={reservoirInMachine}
          toggleReservoirInMachine={() => setReservoirInMachine((prev) => !prev)}
          fill={() => {}}
        />
      </CoffeeMachine>

    </>
  )
}

export default App
