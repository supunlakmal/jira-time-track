import { PageBreadcrumb } from "../../../components";

import Tippy from '@tippyjs/react';
import { Placement, roundArrow, followCursor } from 'tippy.js'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/shift-toward.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/dist/svg-arrow.css';

interface tooltip {
  align: Placement;
  name: string;
}

const placements: tooltip[] = [
  {
    align: "top",
    name: "Top",
  },
  {
    align: "bottom",
    name: "Bottom",
  },
  {
    align: "left",
    name: "Left",
  },
  {
    align: "right",
    name: "Right",
  },
  {
    align: "top-start",
    name: "Top-Start",
  },
  {
    align: "top-end",
    name: "Top-End",
  },
]

const animations: string[] = ["shift-away", "shift-toward", "scale", "perspective"]
const PlacementTooltips = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Placement Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="sub-header">A highly customizable vanilla JS tooltip & popover library</p>
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          The default tippy tooltip looks like this when given no options. It has a nifty backdrop filling animation!
        </p>
        <div className="flex flex-wrap gap-2">

          {(placements || []).map((tooltip, idx) => (
            <Tippy key={idx} arrow={false} animation='scale-subtle' delay={50} content="I&#39;m a Tippy tooltip!" placement={tooltip.align} duration={300}><span className="btn btn-sm bg-primary text-white" tabIndex={0} >{tooltip.name}</span></Tippy>
          ))}

        </div>
      </div>
    </div>
  )
}

const ArrowsTooltips = () => {
  return (

    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Arrows Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          Arrows point toward the reference element.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tippy arrow={true} content="I&#39;m a Tippy tooltip!"><span className="btn btn-sm bg-primary text-white" tabIndex={0} data-plugin="tippy" >Default</span></Tippy>
          <Tippy arrow={roundArrow} content="I&#39;m a Tippy tooltip!"><span className="btn btn-sm bg-primary text-white" tabIndex={0} data-plugin="tippy" >Round</span></Tippy>
        </div>
      </div>
    </div>
  )
}

const InteractivityTooltips = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Interactivity Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          Tooltips can be interactive, meaning they won't hide when you hover over or click on them.
        </p>
        <div className="flex flex-wrap gap-2">
          <span>
            <Tippy content="I&#39;m a Tippy tooltip!" animation='scale-subtle' arrow={false} interactive={true}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Interactive (hover)</span></Tippy>
          </span>
          <Tippy content="I&#39;m a Tippy tooltip!" hideOnClick={true} trigger="click" animation='scale-subtle' arrow={false} interactive={true}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Interactive (click)</span></Tippy>
        </div>
      </div>
    </div>
  )
}

const DurationTooltips = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Duration Tooltips</h4>

        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          A tippy can have different transition durations.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tippy content="I&#39;m a Tippy tooltip!" animation='scale-subtle' arrow={false} duration={0}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>0ms</span></Tippy>
          <Tippy content="I&#39;m a Tippy tooltip!" animation='scale-subtle' arrow={false} duration={200}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>200ms</span></Tippy>
          <Tippy content="I&#39;m a Tippy tooltip!" animation='scale-subtle' arrow={false} duration={1000}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>1000ms</span></Tippy>
          <Tippy content="I&#39;m a Tippy tooltip!" animation='scale-subtle' arrow={false} duration={[500, 200]}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>[500ms, 200ms]</span></Tippy>
        </div>
      </div>
    </div>
  )
}

const AnimationsTooltips = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Animations Tooltips</h4>

        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          Tooltips can have different types of animations.
        </p>
        <div className="flex flex-wrap gap-2">

          {(animations || []).map((animation, idx) => (
            <Tippy key={idx} content="I&#39;m a Tippy tooltip!" animation={animation} arrow={true} duration={300}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>{animation.charAt(0).toUpperCase() + animation.slice(1)}</span></Tippy>
          ))}

        </div>
      </div>
    </div>
  )
}

const ThemesTooltips = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Themes Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          A tippy can have any kind of theme you want! Creating a custom theme is a breeze.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tippy content="See-Through!" animation='scale-subtle' arrow={false} theme="translucent"><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Translucent</span></Tippy>
          <Tippy content="A light Tooltip !" animation='scale-subtle' arrow={true} theme="light"><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Light</span></Tippy>
          <Tippy content="A light border Tooltip !" animation='scale-subtle' arrow={true} theme="light-border"><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Light Border</span></Tippy>
        </div>
      </div>
    </div>
  )
}

const MiscTooltips = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Misc Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-3">
          Tippy has a ton of features, and it's constantly improving.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tippy content="How cool&#39;s this?!" followCursor={true} plugins={[followCursor]} arrow={true}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Follow cursor</span></Tippy>
          <Tippy content="You&#39;ll need a touch device for this one." animation='scale-subtle' touch={['hold', 500]} arrow={false}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Touch &amp; Hold</span></Tippy>
          <Tippy content="I&#39;m hugging the tooltip!" animation='scale-subtle' offset={[0, 0]} arrow={false}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Distance</span></Tippy>
          <Tippy content="10px x-axis, 50px y-axis offset" animation='scale-subtle' offset={[10, 50]} arrow={false}><span className="btn btn-sm bg-primary text-white" tabIndex={0}>Offset</span></Tippy>
        </div>
      </div>

    </div>
  )
}
const TippyTooltip = () => {

  return (
    <>
      <PageBreadcrumb title="Tippy Tooltip" name="Tippy Tooltip" breadCrumbItems={["Konrix", "Extended", "Tippy Tooltip"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <PlacementTooltips />
        <ArrowsTooltips />
        <InteractivityTooltips />
        <DurationTooltips />
        <AnimationsTooltips />
        <ThemesTooltips />
        <MiscTooltips />
      </div>
    </>
  )
};

export default TippyTooltip