import { createMachine } from 'xstate'

const coffeeMachine = createMachine({
  id: 'coffeeMachine',
  initial: 'off',
  context: {},
  states: {
    off: {
      on: {
        TOGGLE_POWER: 'starting',
      },
    },
    starting: {
      after: {
        1000: { target: 'on' },
      },
    },
    on: {
      on: {
        TOGGLE_POWER: 'stopping',
      },
    },
    stopping: {
      after: {
        1000: { target: 'off' },
      },
    },
  },
})

export default coffeeMachine
