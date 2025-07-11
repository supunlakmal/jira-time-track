import { ElementType, ReactNode, useState } from 'react'
import { DropdownContext } from './dropdownContext';
import { DropdownToggle } from './DropdownToggle';
import { DropdownMenu } from './DropdownMenu';

export interface DropdownProps {
  as?: ElementType;
  classNames?: string;
  children?: ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const handleDropdown = (setTo: boolean) => {
    if (setTo === false) setDropDownOpen(setTo)
    else setDropDownOpen(!dropDownOpen)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handleDropdown(false);
  }

  return (
    <DropdownContext.Provider value={{
      isOpen: dropDownOpen,
      handleDropdown: handleDropdown,
      handleKeyPress: handleKeyPress,
    }}>
      {children}
    </DropdownContext.Provider>
  );
};

export default Object.assign(Dropdown, {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
});

