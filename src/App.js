import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Containers/Checkout/Checkout';
import Payment from './Containers/Payment/Payment';
import Login from './Components/Login/Login';
import { useEffect } from 'react';
import { authetication } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripeAPIkey = "pk_test_51HzjrRLqYQpz7YYBTgt7qzcv3dY02vkHAk9RqVDiI2L9b366IX7bINvY3E9hFPmUONnD8fPpoabULkgJbyDLamjy00WWOgjzpT";
const promise = loadStripe(stripeAPIkey);

function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // it will only run once when App component loads!
    // onAuthStateChanged will make sure that if there is any change in the authenication, useEffect is fired again
    authetication.onAuthStateChanged(authUser => {
      console.log('Username: ' + authUser);
      if (authUser) {
        // user just logged in / user was already logged in
        // call the reducer function in reducer.js
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    });

    // whatever we write in the array below, if that thing changes, useEffect will be fired again
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/login'>
            <Header />
            <Login />
          </Route>

          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>

          <Route path='/payment'>
            <Header />
            {/* Elements come from react-stripe-js and it is just to provide payment functionality */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
