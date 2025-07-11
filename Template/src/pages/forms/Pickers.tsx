import { useState } from "react";
import { CustomFlatpickr, PageBreadcrumb } from "../../components";
import { BlockPicker, ChromePicker, ColorResult, CompactPicker, GithubPicker, HuePicker, SketchPicker, SwatchesPicker, TwitterPicker } from 'react-color'

const Pickers = () => {
  const [color, setColor] = useState()

  const handleColorChange = (e: any) => {
    setColor(e)
  }

  return (
    <>
      <PageBreadcrumb name="Picker" title="Picker" breadCrumbItems={["Konrix", "Form", "Picker"]} />
      <div className="grid grid-cols-12 gap-6">
        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Basic Example</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr
                className="form-input"
                options={{
                  enableTime: false,
                }}
                value={new Date()}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">DateTime</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className="form-input" options={{
                dateFormat: "Y-m-d H:i",
              }}
                value={new Date('07-17-2023 16:49')}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Human-friendly Dates</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className="form-input" value={new Date()} options={{
                altInput: true,
                enableTime: false,
                altFormat: "F j, Y",
                dateFormat: "Y-m-d",
              }} />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">MinDate and MaxDate</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className='form-input' options={{
                enableTime: false,
                minDate: "today",
                maxDate: new Date('2025-05-01'),
                defaultDate: ["2023-06-17"],
              }}
                placeholder="MinDate and MaxDate"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Disabling dates</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className='form-input' placeholder='Disabling dates' options={{
                "disable": [
                  function (date: Date) {
                    return (date.getDay() === 0 || date.getDay() === 6);
                  }
                ],
                "locale": {
                  "firstDayOfWeek": 1 // start week on Monday
                },
                enableTime: false,
              }}
                value={new Date()}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Selecting multiple dates</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className='form-input'
                placeholder='Multiple dates'
                options={{
                  mode: "multiple",
                  dateFormat: "Y-m-d",
                  defaultDate: ["2016-10-20", "2016-11-04"],
                  enableTime: false,
                }}
                value={[new Date(), new Date((new Date()).valueOf() + 1000 * 3600 * 24)]}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Range</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className='form-input'
                value={[new Date(), new Date((new Date()).valueOf() + 1000 * 3600 * 48)]}
                options={{
                  enableTime: false,
                  mode: "range",
                }} />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Picker</h4>
              </div>
            </div>
            <div className="p-6">
              <CustomFlatpickr className='form-input' options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                defaultTime: ["17:23"]
              }}
                value={new Date().getTime()}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Colorpicker</h4>
              </div>
            </div>

            <div className="p-6">
              <div>
                <h5 className="text-base mb-3">Themes</h5>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Sketch Demo</h5>
                    <p className="text-gray-400 grow">Use <code>Sketchpicker</code> to set
                      Sketch colorpicker.</p>
                    <SketchPicker color={color} onChangeComplete={(e) => handleColorChange(e)} />
                  </div>
                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Chrome Demo</h5>
                    <p className="text-gray-400 grow">Use <code>Chromepicker</code> to set
                      Chrome colorpicker.</p>
                    <ChromePicker color={color} onChangeComplete={(e) => handleColorChange(e)} />
                  </div>
                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Block Demo</h5>
                    <p className="text-gray-400 grow">Use <code>Blockpicker</code>to set Block
                      colorpicker.</p>
                    <BlockPicker color={color} onChangeComplete={(e) => handleColorChange(e)} />

                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h5 className="text-base mb-2">Options</h5>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Demo</h5>
                    <p className="text-gray-400 grow">Use <code>GithubPicker</code> to set GithubPicker
                      option colorpicker.</p>
                    <GithubPicker color={color} onChangeComplete={(e) => handleColorChange(e)} width={"240"} />
                  </div>
                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0"> Hue Colorpicker</h5>
                    <p className="text-gray-400 grow">Use <code>colorpicker hue</code>to set
                      colorpicker with hue.</p>
                    <HuePicker color={color} onChangeComplete={(e) => handleColorChange(e)} width={"250"} />
                  </div>
                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Switches</h5>
                    <p className="text-gray-400 grow">Use <code>switchesPicker</code> to set switch
                      colorpicker.</p>
                    <div>
                      <SwatchesPicker color={color} width={240} onChangeComplete={(e) => handleColorChange(e)} />
                    </div>
                  </div>

                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Picker with Input</h5>
                    <p className="text-gray-400 grow">Use <code>CompactPicker</code> to set
                      colorpicker with input.</p>
                    <CompactPicker color={color} onChangeComplete={(e) => handleColorChange(e)} />
                  </div>

                  <div className="bg-slate-100 p-4 rounded-md flex flex-col">
                    <h5 className="text-base text-gray-400 mb-2 shrink-0">Color Format</h5>
                    <p className="text-gray-400 grow">Use <code>TwitterPicker</code> to set
                      colorpicker with format option.</p>
                    <TwitterPicker color={color} onChangeComplete={(e) => handleColorChange(e)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Pickers