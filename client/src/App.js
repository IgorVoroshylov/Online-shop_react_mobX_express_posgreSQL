import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Context } from '.'
import AppRouter from './components/AppRouter'
import NavBar from './pages/Navbar'
import { check } from './http/userAPI'

const App = observer( () => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
    .then(data => {
      user.setIsAuth(true);
      user.setUser(data);
    })
    .catch(err => {console.log(err.message)})
    .finally(() => {
      setLoading(false);
    })
  }, [user]);

  if(loading) {
    return <div>Loading</div>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
