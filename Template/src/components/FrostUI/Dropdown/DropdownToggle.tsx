import { useContext, useRef } from "react";
import { DropdownContext } from "./dropdownContext";
import { DropdownProps } from ".";
import { useOutsideClick } from "../../../hooks";

export const DropdownToggle = ({ children, as: tag = 'button', classNames }: DropdownProps) => {
  const { isOpen, handleDropdown, handleKeyPress } = useContext(DropdownContext);
  const Tag = tag
  const ref = useRef();

  const onClickOutside = () => {
    handleDropdown(false)
  }

  useOutsideClick(ref, onClickOutside)

  return (
    <Tag ref={ref} className={`${classNames ? classNames : ''} ${isOpen ? 'open' : ''}`} onClick={handleDropdown} onKeyDown={handleKeyPress}>
      {children}
    </Tag>
  )
}