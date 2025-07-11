import { ElementType, FC, RefObject, useRef } from 'react';

interface CollapseProps {
  open: boolean;
  children: any;
  classNames?: string;
  as?: ElementType;
}

const SimpleCollapse: FC<CollapseProps> = ({ open, children, classNames, as: tag = "div" }) => {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const height = open ? (ref.current?.scrollHeight ?? 0) : 0;
  const Tag = tag
  return <Tag ref={ref} className={`transition-all overflow-hidden ${classNames ? classNames : ''}`} style={{ height: height }}>{children}</Tag>;
};

export default SimpleCollapse;
