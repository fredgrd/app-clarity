import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import './app.css';
import { useEffect, useState } from 'react';
import { fetchUser } from './app/slices/user.slice';
import AuthPage from './pages/auth.page';
import Toast from './components/toast/toast.component';

function App() {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await dispatch(fetchUser()).unwrap();
        setShowLoader(false);
      } catch (error) {
        console.log('ERROR', error);
        setShowLoader(false);
      }
    };

    fetch();
  }, []);
  return (
    <>
      {showLoader ? (
        <div className="loader">LOADING</div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="auth">
              <Route
                path="signin/:token?"
                element={<AuthPage mode={'signin'} />}
              />
              <Route path="signup" element={<AuthPage mode={'signin'} />} />
              {/* Coach signin routes */}
            </Route>
          </Routes>
          <Toast />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
