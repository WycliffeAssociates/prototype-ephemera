import {SettingsProvider} from './hooks/SettingsContext';
import {GreekWordsProvider} from './hooks/GreekWordsContext';
import { View } from './components/View';


function App() {

  return (
    <div className="App">
      <SettingsProvider>
        <GreekWordsProvider>
          <View/>
        </GreekWordsProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
