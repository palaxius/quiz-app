import React, {useState} from 'react';
import './Layout.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {useSelector} from "react-redux";

const Layout = ({children}) => {
  const isAuth = useSelector(state => state.auth.token)

  const [menu, setMenu] = useState(false)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const onCloseHandler = () => {
    setMenu(false)
  }

  return (
    <div className='layout'>
      <Drawer
        isOpen={menu}
        onClose={onCloseHandler}
        isAuth={!!isAuth}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />
      <main>
        { children }
      </main>
    </div>

  );
};

export default Layout;
