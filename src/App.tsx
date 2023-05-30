import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import './app.css';
import { useEffect } from 'react';
import { fetchUser } from './app/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await dispatch(fetchUser()).unwrap();
        console.log('USER', user);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
