import { HomeView } from './views/HomeView';
import { Provider } from "react-redux";
import { StateStore } from './utils/sm/StateStore';
import './App.css';
import 'antd/dist/antd.css';


function App() {
  return (
    
    <div className="App">
    <Provider store={StateStore}>
      <HomeView/>
    </Provider>
    </div>
  );
}

export default App;
