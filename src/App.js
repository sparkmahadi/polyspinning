import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <RouterProvider router={router}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </RouterProvider>
  );
}

export default App;
