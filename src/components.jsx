import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPowerOff } from '@fortawesome/free-solid-svg-icons'

export const PowerIcon = ({ ...rest }) => <FontAwesomeIcon icon={faPowerOff} {...rest} />
export const CoffeeIcon = ({ ...rest }) => <FontAwesomeIcon icon={faCoffee} {...rest} />

export const CoffeeMachine = ({ children, reservoirInMachine }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        width: '900px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          border: '2px solid black',
          borderRadius: '5px',
          width: '600px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: '10px',
            padding: '10px',
          }}
        >
          {children.slice(0, children.length - 1)}
        </div>

        {reservoirInMachine ? children[children.length - 1] : null}
      </div>

      {!reservoirInMachine ? <div>{children[children.length - 1]}</div> : null}
    </div>
  )
}

export const WaterReservoir = ({
  contents = 0,
  reservoirInMachine,
  toggleReservoirInMachine,
  fill,
}) => {
  const [showButtons, setShowButtons] = React.useState(false)

  return (
    <div
      style={{
        display: 'grid',
        height: '95%',
        margin: '5px',
        padding: '5px',
        border: '2px solid lightgray',
        borderRadius: '5px',
        alignItems: 'end',
        position: 'relative',
      }}
      onMouseOver={() => setShowButtons(true)}
      onMouseOut={() => setShowButtons(false)}
    >
      <div
        style={{
          top: '120px',
          left: '40px',
          background: 'transparent',
          visibility: showButtons ? 'visible' : 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <button
          style={{ width: '80px', height: '40px', margin: '20px' }}
          onClick={() => {
            toggleReservoirInMachine()
          }}
        >
          {reservoirInMachine ? 'Take out' : 'Put in'}
        </button>
        <button style={{ width: '80px', height: '40px', margin: '20px' }} onClick={fill}>
          Fill
        </button>
      </div>
      <div
        style={{
          backgroundColor: '#d4f1f9',
          width: '100%',
          height: `${contents}%`,
          borderRadius: '5px',
        }}
      />
    </div>
  )
}

export const PowerButton = ({ isOn, toggle }) => (
  <div style={{ width: '100%', textAlign: 'center' }}>
    <button
      onClick={toggle}
      style={{
        width: '80px',
        height: '80px',
        border: '2px solid transparent',
        borderRadius: '15px',
        backgroundColor: '#ddd',
      }}
    >
      <PowerIcon style={{ color: isOn ? 'green' : 'white', fontSize: '50px' }} />
    </button>
  </div>
)

export const CoffeeButtons = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </div>
)

export const CoffeeButton = ({ children, disabled, ...rest }) => {
  const coffee = children.toLowerCase()
  const fontSizes = {
    lungo: '30px',
    espresso: '25px',
    ristretto: '20px',
  }

  if (!Object.keys(fontSizes).includes(coffee)) return null

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        style={{
          width: '80px',
          height: '80px',
          border: '2px solid transparent',
          borderRadius: '15px',
          backgroundColor: '#ddd',
        }}
        {...rest}
        title={coffee}
      >
        <CoffeeIcon
          style={{ fontSize: `${fontSizes[coffee]}`, color: disabled ? '#ddd' : 'black' }}
        />
      </button>
    </div>
  )
}

export const Display = ({ children, isOn }) => (
  <div
    style={{
      border: '2px solid lightgray',
      borderRadius: '5px',
      padding: '3px',
      fontFamily: 'monospace',
      fontSize: '30px',
      height: '120px',
      textAlign: 'center',
      paddingTop: '30px',
      color: 'black',
      backgroundColor: isOn ? '#ddd' : 'transparent',
    }}
  >
    {children}
  </div>
)
