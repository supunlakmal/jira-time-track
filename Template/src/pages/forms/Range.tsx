import Nouislider from "nouislider-react";

// styles

import useRangeSlider from "../../hooks/useRangeSlider";
import { PageBreadcrumb } from "../../components";
import { useState } from "react";

const Range = () => {
  const [state, setState] = useState("rgb(127, 127, 127)")

  const colors = ["red", "green", "blue"];
  // 1. 80 2. 170 3. 163

  const onUpdate = (index: any) => (render: any, handle: any, value: any, un: any, percent: any) => {
    colors[index] = value[0];
    setState(`rgb(${colors.join(",")})`);
  };

  const { selectedVals, selectedRanges, selectedRanges2, onSlide, onSlide2, onSlide3 } = useRangeSlider();

  return (
    <>
      <PageBreadcrumb name="Range" title="Form Range" breadCrumbItems={["Konrix", "Form", "Range"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="space-y-6">

          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Single</h4>
              </div>
            </div>

            <div className="p-6">
              <Nouislider
                range={{ min: 0, max: 100 }}
                start={[20]}
                connect
                onSlide={(render, handle, value, un, percent) => onSlide(1, value, percent)}
              />
              <p className="pt-2">
                Value:{' '}
                {selectedVals ? (
                  <span>
                    {selectedVals[1]['textValue']}, &nbsp;
                    {selectedVals[1]['percent']}%
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Slider Step</h4>
              </div>
            </div>

            <div className="p-6">
              <Nouislider
                range={{ min: 0, max: 100 }}
                start={[20]}
                step={10}
                connect
                onSlide={(render, handle, value, un, percent) => onSlide(2, value, percent)}
              />
              <p className="pt-2">
                Value:{' '}
                {selectedVals ? (
                  <span>
                    {selectedVals[2]['textValue']}, &nbsp;
                    {selectedVals[2]['percent']}%
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Range</h4>
              </div>
            </div>
            <div className="p-6">
              <Nouislider
                range={{ min: 10, max: 150 }}
                start={[20, 45]}
                connect
                onSlide={(render, handle, value, un, percent) => onSlide2(1, value)}
              />
              <p className="pt-2">
                Value: {selectedRanges ? (
                  <span>{selectedRanges[1]}</span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Soft limits</h4>
              </div>
            </div>
            <div className="p-6">
              <Nouislider
                range={{ min: 0, max: 100 }}
                start={50}
                connect
                pips={{ mode: "values", values: [20, 80], density: 4 }}
                onSlide={(render, handle, value, un, percent) => onSlide(1, value, percent)}
              />
              <p className="pt-8">
                Value: {' '}
                {selectedVals ? (
                  <span>
                    {selectedVals[1]['textValue']}, &nbsp;
                    {selectedVals[1]['percent']}%
                  </span>
                ) : null}
              </p>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Colorpicker</h4>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-5">

                {(colors || []).map((color, idx) => {
                  return (
                    <Nouislider key={idx} onUpdate={onUpdate(idx)} orientation="vertical" style={{ height: "200px", width: "20px" }} range={{ min: 0, max: 255 }} start={[100]} />
                  )
                })}

                <div id="result" style={{ background: state }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Range Slider with Steps</h4>
              </div>
            </div>
            <div className="p-6">
              <Nouislider
                behaviour="tap"
                step={350}
                range={{ min: 0, max: 10000 }}
                start={[500, 4000]}
                connect
                onSlide={(value) => onSlide3(1, value)}
              />
              <p className="mt-2 mb-0">
                Value: {selectedRanges2 ? <span>{selectedRanges2[1]}</span> : null}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Creating a toggle</h4>
              </div>
            </div>
            <div className="p-6">
              <Nouislider
                orientation="vertical"
                style={{ height: "50px" }}
                range={{ min: [0, 1], max: 1 }}
                start={0}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
};

export default Range