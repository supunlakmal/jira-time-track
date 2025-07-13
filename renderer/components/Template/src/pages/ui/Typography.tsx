import { PageBreadcrumb } from "../../components";

const Typography = () => {
  return (
    <>
      <PageBreadcrumb title="Typography" name="Typography" breadCrumbItems={["Konrix", "Components", "Typography"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Heading Examples</h4>
              </div>
            </div>
            <div className="p-6">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h1 className="text-xs">text-xs <span className="text-base">(12px)</span></h1>
                  <h1 className="text-sm">text-sm <span className="text-base">(14px)</span></h1>
                  <h1 className="text-base">text-base (16px)</h1>
                  <h1 className="text-lg">text-lg <span className="text-base">(18px)</span></h1>
                  <h1 className="text-xl">text-xl <span className="text-base">(20px)</span></h1>
                  <h1 className="text-2xl">text-2xl <span className="text-base">(24px)</span></h1>
                  <h1 className="text-3xl">text-3xl <span className="text-base">(30px)</span></h1>
                  <h1 className="text-4xl">text-4xl <span className="text-base">(36px)</span></h1>
                  <h1 className="text-5xl">text-5xl <span className="text-base">(48px)</span></h1>
                </div>
                <div className="space-y-4">
                  <h1 className="text-6xl">text-6xl <span className="text-base">(60px)</span></h1>
                  <h1 className="text-7xl">text-7xl <span className="text-base"> (72px)</span></h1>
                  <h1 className="text-8xl">text-8xl <span className="text-base">(96px)</span></h1>
                  <h1 className="text-9xl">text-9xl<span className="text-base">(128px)</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Text Colored Examples</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <h1 className="text-primary text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-secondary text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-success text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-info text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-danger text-lg">The quick brown fox jumps over the lazy dog.</h1>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Text gradient Examples</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-3xl bg-gradient-to-l from-primary to-info bg-clip-text font-semibold text-transparent">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-3xl bg-gradient-to-r from-danger to-success bg-clip-text font-semibold text-transparent">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-3xl bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text font-semibold text-transparent">The quick brown fox jumps over the lazy dog.</p>
            </div>

          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Text Colored Opacity Examples</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <h1 className="text-primary/90 text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-primary/75 text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-primary/50 text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-primary/25 text-lg">The quick brown fox jumps over the lazy dog.</h1>
              <h1 className="text-primary/10 text-lg">The quick brown fox jumps over the lazy dog.</h1>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Text Decoration Examples</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-lg underline">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-lg overline">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-lg line-through">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-lg no-underline">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Text Colored Decoration</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-lg underline decoration-primary">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-lg overline decoration-success decoration-2">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-lg line-through decoration-danger decoration-2">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-lg no-underline">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Text Decoration Style</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-lg underline decoration-solid">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-lg underline decoration-double">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-lg underline decoration-dotted">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-lg underline decoration-wavy">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Typography