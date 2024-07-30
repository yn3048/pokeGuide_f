import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from "./router/root";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <RouterProvider router={root}/>
      </div>
    </Provider>
  );
}

export default App;