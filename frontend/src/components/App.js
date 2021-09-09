import { useState } from 'react';
import '../App.css';
import ButtonAppBar from './Appbar/Appbar';

function App() {

  const sessionUuid = '009876';

  // our useState hook in the react component to remember the logged in user (or if they ar enot logged in)
  const [currentUserUuid, setCurrentUserUuid] = useState({
    uuid: sessionUuid || null
  })

  console.log("what is currentUserUui? " + currentUserUuid.uuid);

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