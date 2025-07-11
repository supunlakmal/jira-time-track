import { useContext } from "react";
import { DropdownContext } from "./dropdownContext";
import { DropdownProps } from ".";

interface DropdownMenuProps extends DropdownProps {
  placement?: 'start' | 'end';
}

export const DropdownMenu = ({ children, as: tag = 'div', classNames, placement }: DropdownMenuProps) => {
  const { isOpen, handleDropdown } = useContext(DropdownContext);
  const Tag = tag
  const placeAt = placement === 'start' ? 'start-0' : placement === 'end' ? 'end-0' : null
  return (
    <Tag className={`${classNames ? classNames + ' ' : ''} ${placeAt ? placeAt + ' ' : ''} ${isOpen ? 'open ' : 'hidden '}`} onClick={handleDropdown}>
      {children}
    </Tag>
  )
}