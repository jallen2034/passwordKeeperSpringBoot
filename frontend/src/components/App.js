import { useState } from 'react';
import ButtonAppBar from './Appbar/Appbar';

function App() {

  // usestate our app will use we will drill down into our components
  // this is a hardcoded value for now
  const sessionUuid = '009876'
  const [clickedPassword, setClickedPassword] = useState('')
  const [register, setRegister] = useState('')

  // our useState hook in the react component to remember the logged in user (or if they ar enot logged in)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null
  })

  return (
    <>
      <div className="App">
        <ButtonAppBar
          setCurrentUserUuid={setCurrentUserUuid}
        />
      </div>
    </>
  );
}

export default App;