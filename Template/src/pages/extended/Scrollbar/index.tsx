import SimpleBar from "simplebar-react";
import { PageBreadcrumb } from "../../../components";

const Scrollbar = () => {
  return (
    <>
      <PageBreadcrumb name='Scrollbar' title='Scrollbar' breadCrumbItems={["Konrix", "Extended", "Scrollbar"]} />
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Custom Scroll (CSS)</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="custom-scroll overflow-auto h-56">
              <div className="max-w-full">
                <p className="text-lg text-slate-700 dark:text-slate-400">Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.</p>
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">It's fast, flexible, and reliable — with zero-runtime.</p>
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">Over 500+ professionally designed, fully responsive, expertly crafted component examples you can drop into your Tailwind projects and customize to your heart’s content.</p>
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">Tailwind CSS is incredibly performance focused and aims to produce the smallest CSS file possible by only generating the CSS you are actually using in your project.</p>
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">Combined with minification and network compression, this usually leads to CSS files that are less than 10kB, even for large projects. For example, Netflix uses Tailwind for <a className="underline" target="_blank" href="https://top10.netflix.com/">Netflix Top 10</a> and the entire website delivers only 6.5kB of CSS over the network.</p>
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">With CSS files this small, you don’t have to worry about complex solutions like code-splitting your CSS for each page, and can instead just ship a single small CSS file that’s downloaded once and cached until you redeploy your site.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Simplebar Scroll</h4>
            </div>
          </div>

          <div className="p-6">
            <SimpleBar className="h-56">
              <div className="prose max-w-full text-slate-700 dark:text-slate-400">
                SimpleBar does only one thing: replace the browser's default scrollbar
                with a custom CSS-styled one without losing performances.
                Unlike some popular plugins, SimpleBar doesn't mimic scroll with
                Javascript, causing janks and strange scrolling behaviours...
                You keep the awesomeness of native scrolling...with a custom scrollbar!
                <p>SimpleBar <strong className="dark:text-white">does NOT implement a custom scroll
                  behaviour</strong>. It keeps the <strong className="dark:text-white">native</strong>
                  <code>overflow: auto</code> scroll and <strong className="dark:text-white">only</strong> replace
                  the scrollbar visual appearance.
                </p>
                <h5>Design it as you want</h5>
                <p>SimpleBar uses pure CSS to style the scrollbar. You can easily
                  customize it as you want! Or even have multiple style on the same
                  page...or just keep the default style ("Mac OS" scrollbar style).
                </p>
                <h5>Lightweight and performant</h5>
                <p>Only 6kb minified. SimpleBar doesn't use Javascript to handle
                  scrolling. You keep the performances/behaviours of the native
                  scroll.</p>
                <h5>Supported everywhere</h5>
                <p>SimpleBar has been tested on the following browsers: Chrome, Firefox,
                  Safari, Edge, IE11.</p>
              </div>
            </SimpleBar>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">RTL Position</h4>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm mb-4 text-slate-700 dark:text-slate-400">Just use data attribute <code>data-simplebar data-simplebar-direction='rtl'</code>
              and add <code>max-height: **px</code> oh fix height</p>

            <SimpleBar className="h-56" data-simplebar-direction='rtl'>
              <div className="prose max-w-full text-slate-700 dark:text-slate-400">
                SimpleBar does only one thing: replace the browser's default scrollbar
                with a custom CSS-styled one without losing performances.
                Unlike some popular plugins, SimpleBar doesn't mimic scroll with
                Javascript, causing janks and strange scrolling behaviours...
                You keep the awesomeness of native scrolling...with a custom scrollbar!
                <p>SimpleBar <strong className="dark:text-white">does NOT implement a custom scroll
                  behaviour</strong>. It keeps the <strong className="dark:text-white">native</strong>
                  <code>overflow: auto</code> scroll and <strong className="dark:text-white">only</strong> replace
                  the scrollbar visual appearance.
                </p>
                <h5>Design it as you want</h5>
                <p>SimpleBar uses pure CSS to style the scrollbar. You can easily
                  customize it as you want! Or even have multiple style on the same
                  page...or just keep the default style ("Mac OS" scrollbar style).
                </p>
                <h5>Lightweight and performant</h5>
                <p>Only 6kb minified. SimpleBar doesn't use Javascript to handle
                  scrolling. You keep the performances/behaviours of the native
                  scroll.</p>
                <h5>Supported everywhere</h5>
                <p>SimpleBar has been tested on the following browsers: Chrome, Firefox,
                  Safari, Edge, IE11.</p>
              </div>
            </SimpleBar>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Scroll Size</h4>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm mb-4 text-slate-700 dark:text-slate-400">Just use data attribute <code>data-simplebar</code>
              and add <code>max-height: **px</code> oh fix height</p>

            <SimpleBar className="h-56" data-simplebar-lg>
              <div className="prose-lg max-w-full text-slate-700 dark:text-slate-400">
                SimpleBar does only one thing: replace the browser's default scrollbar
                with a custom CSS-styled one without losing performances.
                Unlike some popular plugins, SimpleBar doesn't mimic scroll with
                Javascript, causing janks and strange scrolling behaviours...
                You keep the awesomeness of native scrolling...with a custom scrollbar!
                <p>SimpleBar <strong className="dark:text-white">does NOT implement a custom scroll
                  behaviour</strong>. It keeps the <strong className="dark:text-white">native</strong>
                  <code>overflow: auto</code> scroll and <strong className="dark:text-white">only</strong> replace
                  the scrollbar visual appearance.
                </p>
                <h5>Design it as you want</h5>
                <p>SimpleBar uses pure CSS to style the scrollbar. You can easily
                  customize it as you want! Or even have multiple style on the same
                  page...or just keep the default style ("Mac OS" scrollbar style).
                </p>
                <h5>Lightweight and performant</h5>
                <p>Only 6kb minified. SimpleBar doesn't use Javascript to handle
                  scrolling. You keep the performances/behaviours of the native
                  scroll.</p>
                <h5>Supported everywhere</h5>
                <p>SimpleBar has been tested on the following browsers: Chrome, Firefox,
                  Safari, Edge, IE11.</p>
              </div>
            </SimpleBar>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Scroll Color</h4>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm mb-4 text-slate-700 dark:text-slate-400">Just use data attribute <code>data-simplebar data-simplebar-primary</code>
              and add <code>max-height: **px</code> oh fix height</p>

            <SimpleBar className="h-56" data-simplebar-primary>
              <div className="prose max-w-full text-slate-700 dark:text-slate-400">
                SimpleBar does only one thing: replace the browser's default scrollbar
                with a custom CSS-styled one without losing performances.
                Unlike some popular plugins, SimpleBar doesn't mimic scroll with
                Javascript, causing janks and strange scrolling behaviours...
                You keep the awesomeness of native scrolling...with a custom scrollbar!
                <p>SimpleBar <strong className="dark:text-white">does NOT implement a custom scroll
                  behaviour</strong>. It keeps the <strong className="dark:text-white">native</strong>
                  <code>overflow: auto</code> scroll and <strong className="dark:text-white">only</strong> replace
                  the scrollbar visual appearance.
                </p>
                <h5>Design it as you want</h5>
                <p>SimpleBar uses pure CSS to style the scrollbar. You can easily
                  customize it as you want! Or even have multiple style on the same
                  page...or just keep the default style ("Mac OS" scrollbar style).
                </p>
                <h5>Lightweight and performant</h5>
                <p>Only 6kb minified. SimpleBar doesn't use Javascript to handle
                  scrolling. You keep the performances/behaviours of the native
                  scroll.</p>
                <h5>Supported everywhere</h5>
                <p>SimpleBar has been tested on the following browsers: Chrome, Firefox,
                  Safari, Edge, IE11.</p>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </>
  )
};

export default Scrollbar