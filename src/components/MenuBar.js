import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';

function MenuBar(){
    const {user,logout} =  useContext(AuthContext)
    const pathName = window.location.pathname;
    const path = pathName === '/' ? 'home' : pathName.substr(1);
    const [activeItem,setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
      <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to='/'
          />
          {/* <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={handleItemClick}
          /> */}
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={logout}
              as={Link}
              to='/login'
            />
          </Menu.Menu>
        </Menu>
    ) : (
      <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='Login'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          {/* <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={handleItemClick}
          /> */}
          <Menu.Menu position='right'>
            {/* <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to='/login'
            /> */}
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>
    );

    return menuBar
}

export default MenuBar