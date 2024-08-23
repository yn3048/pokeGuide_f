import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from "./router/root";
import { Provider } from 'react-redux';
import store from './store';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    
    <Provider store = {store}>
      <DefaultLayout>
      <div className="App">
        <RouterProvider router={root}/>
      </div>
      </DefaultLayout>
    </Provider>
    
  );
}

export default App;