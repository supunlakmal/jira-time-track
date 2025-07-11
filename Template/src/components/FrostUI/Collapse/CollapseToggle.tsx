import { useContext } from 'react'
import { CollapseProps } from '.'
import { CollapseContext } from './collapseContext';

interface CollapseToggleProps extends CollapseProps {
  openClass?: string;
}

const CollapseToggle = ({ children, as: tag = 'button', className, openClass }: CollapseToggleProps) => {
  const { open, handleCollapse } = useContext(CollapseContext)
  const Tag = tag;
  return (
    <Tag className={`${className}${open ? ' open ' + 'fc-col-open ' : ' fc-col-close '}${(open && openClass) ? openClass : ''}`} onClick={handleCollapse}>{children}</Tag>
  )
}

export default CollapseToggle