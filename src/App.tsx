import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider> 
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
    </BrowserRouter>  
  )
}
// Tudo dentro do contexto é compartilhado.
export default App;
//  pode enviar qualquer tipo como propriedade desde que tipado via typescript.  