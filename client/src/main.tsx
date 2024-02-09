import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Modal from 'react-modal';

Modal.setAppElement(document.body);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
