import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_blue.css";

interface FlatpickrProps {
  className?: string;
  value?: Date | [Date, Date] | number;
  options?: any;
  placeholder?: string;
}

const CustomFlatpickr = ({ className, value, options, placeholder }: FlatpickrProps) => {
  return (
    <>
      <Flatpickr
        className={className}
        data-enable-time
        value={value}
        options={options}
        placeholder={placeholder}
      />
    </>
  )
}

export default CustomFlatpickr;