import React, { useEffect } from 'react';
import classes from './Header.module.css';
import amazonIcon from '../../Images/amazon-icon.png';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { authetication } from '../../firebase';

function Header() {
    const [{ user, basket }, dispatch] = useStateValue();

    let loginOrLogutPage = '/login';        // loginOrLogutPage tells where to move if sign out 
    let username = null;

    // if user is already logged in
    if (user && user.email) {
        username = user.email;
        // remove everything after @
        username = username.substring(0, username.indexOf("@"));

        // convert first character to uppercase
        const initial = username[0].toUpperCase();

        // get a substring starting at index 1
        username = initial + username.substring(1);
        loginOrLogutPage = '/';
    }

    console.log('Username: ', username);

    const handleLoginLogout = () => {
        authetication.signOut();        // logout user
    }

    return (
        <div className={classes.header}>
            <Link to='/'>
                <img className={classes.logo} src={amazonIcon} alt='Amazon logo' />
            </Link>
            <div className={classes.search}>
                <input className={classes.inputField} type='text' />
                <SearchIcon className={classes.SearchIcon} />
            </div>

            <div className={classes.navigation}>
                <Link to={loginOrLogutPage}>
                    <div onClick={handleLoginLogout} className={classes.option}>
                        <span className={classes.lineOne}>Hello {username ? username : "Guest"}</span>
                        <span className={classes.lineTwo}>{username ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <div className={classes.option}>
                    <span className={classes.lineOne}>Returns</span>
                    <span className={classes.lineTwo}>&Orders</span>
                </div>

                <div className={classes.option}>
                    <span className={classes.lineOne}>Your</span>
                    <span className={classes.lineTwo}>Prime</span>
                </div>

                <Link to='/checkout' className={classes.Basket}>
                    <div>
                        <ShoppingBasketIcon />
                        <span className={classes.basketCount}>{basket.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
