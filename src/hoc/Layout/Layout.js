import React, {useState} from 'react';
import './Layout.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

const Layout = ({children}) => {
  const [menu, setMenu] = useState(false)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const onCloseHandler = () => {
    setMenu(false)
  }

  return (
    <div className='layout'>
      <Drawer isOpen={menu} onClose={onCloseHandler}/>

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
