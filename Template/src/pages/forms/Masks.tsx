import { MaskedInput } from "rsuite";
import { PageBreadcrumb } from "../../components";

const Masks = () => {
  return (
    <>
      <PageBreadcrumb name="Masks" title="Form Mask" breadCrumbItems={["Konrix", "Forms", "Masks"]} />
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Input Masks</h4>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">A Java-Script Plugin to make masks on form fields and HTML elements.</p>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <form action="#">
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Date</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/,]}
                    placeholder="__/__/___"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="00/00/0000"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Hour</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/]}
                    placeholder="__:__:__"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="00:00:00"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Date & Hour</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/]}
                    placeholder="__/__/___ __:__:__"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="00/00/0000 00:00:00"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">ZIP Code</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                    placeholder="____-__"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="00000-000"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Crazy Zip Code</label>
                  <MaskedInput
                    mask={[/\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
                    placeholder="_-__-__-__"
                    className="form-input"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Money</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ",", /\d/, /\d/,]}
                    placeholder="__.___.__.__,__"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-mask-format="000.000.000.000.000,00" data-reverse="true"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Money 2</label>
                  <MaskedInput
                    mask={[/\d/, ".", /\d/, /\d/, /\d/, ",", /\d/, /\d/]}
                    placeholder="#.##0,00"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="#.##0,00" data-reverse="true"</code></p>
                </div>
              </form>
            </div>

            <div>
              <form action="#">
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Telephone</label>
                  <MaskedInput
                    mask={[/[1-9]/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                    placeholder="____-____"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="0000-0000"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">Telephone with Code Area</label>
                  <MaskedInput
                    mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                    placeholder="(__)____-____"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="(00) 0000-0000"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">US Telephone</label>
                  <MaskedInput
                    mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/,]}
                    placeholder="(___)___-____"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="(000) 000-0000"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">São Paulo Celphones</label>
                  <MaskedInput
                    mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                    placeholder="(__)_____-____"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="(00) 00000-0000"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">CPF</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                    placeholder="___.___.____-__"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-mask-format="000.000.000-00" data-reverse="true"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">CNPJ</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                    placeholder="__.___.___/____-__"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="00.000.000/0000-00" data-reverse="true"</code></p>
                </div>
                <div className="mb-3">
                  <label className="text-gray-800 text-sm font-medium inline-block mb-2">IP Address</label>
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/]}
                    placeholder="___.___.___.___"
                    className="form-input"
                  />
                  <p className="text-xs mt-1">Add attribute <code className="text-primary">data-toggle="input-mask" data-mask-format="099.099.099.099" data-reverse="true"</code></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Masks