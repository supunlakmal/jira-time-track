
import React from 'react';
import * as LayoutConstants from "../../constants/layout";

interface LayoutPositionProps {
  handleChangeLayoutPosition: (value: any) => void;
  layoutPosition?: string;
  layoutConstants: typeof LayoutConstants.LayoutPosition;
}

const LayoutPosition = ({
  handleChangeLayoutPosition,
  layoutPosition,
  layoutConstants,
}: LayoutPositionProps) => {
  return (
    <>
      <div className="p-6">
        <h5 className="font-semibold text-sm mb-3">Layout Position</h5>
        <div className="flex btn-radio">
          <input
            type="radio"
            className="form-radio hidden"
            name="data-layout-position"
            id="layout-position-fixed"
            value={layoutConstants.POSITION_FIXED}
            onChange={(e) => handleChangeLayoutPosition(e.target.value)}
            checked={layoutPosition === layoutConstants.POSITION_FIXED}
          />
          <label className="btn rounded-e-none bg-gray-100 dark:bg-gray-700" htmlFor="layout-position-fixed">Fixed</label>
          <input
            type="radio"
            className="form-radio hidden"
            name="data-layout-position"
            id="layout-position-scrollable"
            value={layoutConstants.POSITION_SCROLLABLE}
            onChange={(e) => handleChangeLayoutPosition(e.target.value)}
            checked={layoutPosition === layoutConstants.POSITION_SCROLLABLE}
          />
          <label className="btn rounded-s-none bg-gray-100 dark:bg-gray-700" htmlFor="layout-position-scrollable">Scrollable</label>
        </div>
      </div>
    </>
  )
}

export default LayoutPosition