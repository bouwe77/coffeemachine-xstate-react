import { createMachine, assign } from 'xstate'

const coffeeMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2AzdYwFkCGyAFgJYB2YAdAA6oDuYATpAPKYDEAKswOLcAyAUQD6ABWYB1AQCVEoGrGIAXYqlKyQAD0QA2bQHYKARgCcAVmMAObReOGADIYBMFgDQgAnogAsho9sf6gaZeto6mAL7hbmiY2PhEZJQ09EwQrOicPPzC4gCCHNJCUgIAytIAaswAkjJIIPJKKmp1nggAtBZ2FF4OhnomenY2AMyOem5aCBaDFA52etMmTn3GkdEYWLgEJOTUdIwspBREYMgA1gBiqAzieIqMbOoNyqrqk22GXgZm9qaOXsMvF5zMM3K0Ab4RnpRnZtMM9I5DBEoiAYpt4jskvtUswjrBFHgGMpSFA2Bp8XdKHh0PcGAAKex2OwASjYaLi20SexShwoFKJZCgT1QChezVAk3hXgojmGJksjmMdmGwyG2jBOi62lMo1MsN0xgC2jWqI2HISu2SBzSeMUqCoVEFZIp9wo1NpDKZLLZZq2FqxPJtfLtDsFwtFTTeiA+Ywopj0AOCFgsYT1hg1CFMFD0gR8pnMYz0Rb0JvZfsx3OtuMyvEEogk0nDjVedXew1MFm68emXkVcP0jgzbS+FH8gx7qtGgPbpd9GK5VpxpBr2SEeQKUiKpQq1VqchFzfFHmj9gMRacetM-mV0ImiCv2iMdlscOVFnjJZNpFQEDg6jL86WtiLCYE2YpRgg+hZhY7ZWJ0Y7GIhQ6dN0vT9MY47GKMn7rLE5YLsBQYnOcVw3JSDBgZGrbRj0xhxvCwQBF8spAqCx6Zo4jhGAC8LJvMjhMl4s54YBAZVrahLEkKdTPFREqIMMKYyiqnH5vmipmBmKqdlhgLvs4cKGJ8yK4einJAYGuIUEweAQK0+4Ri28ntBYviGIpSJKsCdiypxGZItKTICQEuoCdCOGmiJ5liUuwb2o6JKUU5mg0c+9F6Ix2jMYCAIZh2cZeNoKwPhpALCWZ-qVrF363LSSVHpMHZdE4Dg+O5wL2Oq7F6sMFDvh2ukIvCxiFeV5oVouhz1RBw4qulmXZaxQ4mFxOaIv8cILNC2pjfh5DTdR7TAgYOoZb2WVDUt7FtAEWYZRpizwoyQmROEQA */
  createMachine(
    {
      context: { displayText: null, reservoirInMachine: true },
      id: 'coffeeMachine',
      initial: 'poweredOff',
      states: {
        poweredOff: {
          on: {
            TOGGLE_POWER: {
              actions: 'displayWelcome',
              target: 'poweredOn',
            },
            TOGGLE_WATER_RESERVOIR: {
              actions: 'toggleWaterReservoir',
            },
          },
        },
        poweredOn: {
          initial: 'starting',
          states: {
            checkForWater: {
              always: [
                {
                  cond: 'hasWater',
                  target: 'ready',
                },
                {
                  target: 'noWater',
                },
              ],
            },
            starting: {
              entry: 'displayWelcome',
              exit: 'clearDisplay',
              after: {
                1000: {
                  target: 'checkForWater',
                },
              },
            },
            ready: {
              entry: 'displayChoose',
            },
            stopping: {
              entry: 'displayGoodbye',
              exit: 'clearDisplay',
              after: {
                1000: {
                  target: '#coffeeMachine.poweredOff',
                },
              },
            },
            noWater: {
              entry: 'displayNoWater',
            },
          },
          on: {
            TOGGLE_POWER: {
              target: '.stopping',
            },
            TOGGLE_WATER_RESERVOIR: {
              actions: 'toggleWaterReservoir',
              target: '..checkWater',
            },
          },
        },
      },
    },
    {
      actions: {
        displayWelcome: assign({
          displayText: 'Welcome...',
        }),
        displayGoodbye: assign({
          displayText: 'Goodbye...',
        }),
        displayChoose: assign({
          displayText: 'What can I get you?',
        }),
        displayNoWater: assign({
          displayText: 'There is no water',
        }),
        clearDisplay: assign({
          displayText: null,
        }),
        toggleWaterReservoir: assign({
          reservoirInMachine: (context) => {
            return !context.reservoirInMachine
          },
        }),
      },
      guards: {
        hasWater: (context) => {
          return context.reservoirInMachine
        },
      },
    },
  )

export default coffeeMachine
