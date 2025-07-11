import { useState } from 'react';

interface SelectedValsType {
  [key: number]: { textValue: number; percent: number };
}

interface SelectedRangesType {
  [key: number]: string;
}

export default function useRangeSlider() {
  const [selectedVals, setSelectedVals] = useState<SelectedValsType>({
    '1': { textValue: 20, percent: 20 },
    '2': { textValue: 20, percent: 20 },
  });
  const [selectedRanges, setSelectedRanges] = useState<SelectedRangesType>({
    '1': '20-45',
    '2': '20-45',
  });
  const [selectedRanges2, setSelectedRanges2] = useState<SelectedRangesType>({
    '1': '500  4000',
    '2': '500  4000',
  });

  const onSlide = (index: number, value: number[], percent: number[]) => {
    const selectedValues = { ...selectedVals };
    selectedValues[index] = {
      textValue: Number(value[0].toFixed(2)),
      percent: Number(percent[0].toFixed(2)),
    };
    setSelectedVals(selectedValues);
  };

  const onSlide2 = (index: number, value: number[]) => {
    const selectedRange = { ...selectedRanges };
    selectedRange[index] = value[0].toFixed(2) + '  ' + value[1].toFixed(2);
    setSelectedRanges(selectedRange);
  };
  const onSlide3 = (index: number, value: number[]) => {
    const selectedRange2 = { ...selectedRanges2 };
    selectedRange2[index] = value[0] + '       ' + value[1];
    setSelectedRanges2(selectedRange2);
  };


  return {
    selectedVals,
    selectedRanges,
    onSlide,
    onSlide2,
    onSlide3,
    selectedRanges2,
  };
}
