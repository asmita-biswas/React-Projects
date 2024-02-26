import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Accordians from './components/Accordians/Accordians';

function App() {
  const routeMap = {
    children: [
      {
        id: '1',
        path: '/*',
        component: <Accordians />
      }
    ]
  }
  return (
    <HashRouter>
      <Routes>
        {routeMap.children.map((route) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={route.component}
            />
          )
        })}
      </Routes>
    </HashRouter>
  );
}

export default App;
