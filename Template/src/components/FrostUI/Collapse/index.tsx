import { ElementType, ReactNode, useState } from 'react'
import { CollapseContext } from './collapseContext';
import CollapseToggle from './CollapseToggle';
import CollapseMenu from './CollapseMenu';

export interface CollapseProps {
  as?: ElementType;
  open?: boolean;
  className?: string;
  children: ReactNode;
  toggleCollapse?: () => void;
}

const Collapse = ({ children, open, toggleCollapse }: CollapseProps) => {
  const [collapseOpen, setCollapseOpen] = useState<boolean>(false);
  const handleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  }
  return (
    <CollapseContext.Provider value={{
      open: open ?? collapseOpen,
      handleCollapse: toggleCollapse ?? handleCollapse,
    }}>
      {children}
    </CollapseContext.Provider>
  )
}

export default Object.assign(Collapse, {
  Toggle: CollapseToggle,
  Menu: CollapseMenu,
})