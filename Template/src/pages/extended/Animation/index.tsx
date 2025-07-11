import { useState } from "react";

// images
import macbookImg from '../../../assets/images/macbook.png'

// components
import { PageBreadcrumb } from "../../../components";

// styles
import "animate.css/animate.min.css";
import "animate.css/animate.compat.css";

const Animation = () => {

  const [animationType, setAnimationType] = useState<string>("bounce");

  const testAnimation = (x: string) => {
    const animationBox = document.getElementById("animationSandbox");
    animationBox?.classList.add("" + x, "animated");
    animationBox?.addEventListener("animationend", () => {
      animationBox?.classList.remove("" + x, "animated");
    });
  };

  const triggerAnimation = (value: string) => {
    setAnimationType(value);
    testAnimation(value);
  };

  return (
    <>
      <PageBreadcrumb name='Animation' title='Animation' breadCrumbItems={["Konrix", "Extended", "Animation"]} />
      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <div className="p-6">
            <h4 className="header-title">CSS3 Animation</h4>
            <p className="sub-header">
              Just-add-water CSS animations.
            </p>
            <div className="flex justify-center">
              <div id="animationSandbox">
                <img src={macbookImg} alt="" className="block mx-auto" />
              </div>
            </div>
            <div className="flex w-1/2 mx-auto justify-center items-center gap-2 mt-4">
              <select className="form-select js--animations" onChange={(e) => triggerAnimation(e.target.value)}>
                <optgroup label="Attention Seekers">
                  <option className="bounce">bounce</option>
                  <option className="flash">flash</option>
                  <option className="flash">pulse</option>
                  <option className="rubberBand">rubberBand</option>
                  <option className="shakeX">shakeX</option>
                  <option className="shakeY">shakeY</option>
                  <option className="headShake">headShake</option>
                  <option className="swing">swing</option>
                  <option className="tada">tada</option>
                  <option className="wobble">wobble</option>
                  <option className="jello">jello</option>
                  <option className="heartBeat">heartBeat</option>
                </optgroup>

                <optgroup label="Back entrances">
                  <option className="backInDown">backInDown</option>
                  <option className="backInLeft">backInLeft</option>
                  <option className="backInRight">backInRight</option>
                  <option className="backInUp">backInUp</option>
                </optgroup>

                <optgroup label="Back exits">
                  <option className="backOutDown">backOutDown</option>
                  <option className="backOutLeft">backOutLeft</option>
                  <option className="backOutRight">backOutRight</option>
                  <option className="backOutUp">backOutUp</option>
                </optgroup>

                <optgroup label="Bouncing entrances">
                  <option className="bounceIn">bounceIn</option>
                  <option className="bounceInDown">bounceInDown</option>
                  <option className="bounceInLeft">bounceInLeft</option>
                  <option className="bounceInRight">bounceInRight</option>
                  <option className="bounceInUp">bounceInUp</option>
                </optgroup>

                <optgroup label="Bouncing exits">
                  <option className="bounceOut">bounceOut</option>
                  <option className="bounceOutDown">bounceOutDown</option>
                  <option className="bounceOutLeft">bounceOutLeft</option>
                  <option className="bounceOutRight">bounceOutRight</option>
                  <option className="bounceOutUp">bounceOutUp</option>
                </optgroup>

                <optgroup label="Fading Entrances">
                  <option className="fadeIn">fadeIn</option>
                  <option className="fadeInDown">fadeInDown</option>
                  <option className="fadeInDownBig">fadeInDownBig</option>
                  <option className="fadeInLeft">fadeInLeft</option>
                  <option className="fadeInLeftBig">fadeInLeftBig</option>
                  <option className="fadeInRight">fadeInRight</option>
                  <option className="fadeInRightBig">fadeInRightBig</option>
                  <option className="fadeInUp">fadeInUp</option>
                  <option className="fadeInUpBig">fadeInUpBig</option>
                  <option className="fadeInTopLeft">fadeInTopLeft</option>
                  <option className="fadeInTopRight">fadeInTopRight</option>
                  <option className="fadeInBottomLeft">fadeInBottomLeft</option>
                  <option className="fadeInBottomRight">fadeInBottomRight</option>
                </optgroup>

                <optgroup label="Fading Exits">
                  <option className="fadeOut">fadeOut</option>
                  <option className="fadeOutDown">fadeOutDown</option>
                  <option className="fadeOutDownBig">fadeOutDownBig</option>
                  <option className="fadeOutLeft">fadeOutLeft</option>
                  <option className="fadeOutLeftBig">fadeOutLeftBig</option>
                  <option className="fadeOutRight">fadeOutRight</option>
                  <option className="fadeOutRightBig">fadeOutRightBig</option>
                  <option className="fadeOutUp">fadeOutUp</option>
                  <option className="fadeOutUpBig">fadeOutUpBig</option>
                  <option className="fadeOutTopLeft">fadeOutTopLeft</option>
                  <option className="fadeOutTopRight">fadeOutTopRight</option>
                  <option className="fadeOutBottomRight">fadeOutBottomRight</option>
                  <option className="fadeOutBottomLeft">fadeOutBottomLeft</option>
                </optgroup>

                <optgroup label="Flippers">
                  <option className="flip">flip</option>
                  <option className="flipInX">flipInX</option>
                  <option className="flipInY">flipInY</option>
                  <option className="flipOutX">flipOutX</option>
                  <option className="flipOutY">flipOutY</option>
                </optgroup>

                <optgroup label="Lightspeed">
                  <option className="lightSpeedInRight">lightSpeedInRight</option>
                  <option className="lightSpeedInLeft">lightSpeedInLeft</option>
                  <option className="lightSpeedOutRight">lightSpeedOutRight</option>
                  <option className="lightSpeedOutLeft">lightSpeedOutLeft</option>
                </optgroup>

                <optgroup label="Rotating Entrances">
                  <option className="rotateIn">rotateIn</option>
                  <option className="rotateInDownLeft">rotateInDownLeft</option>
                  <option className="rotateInDownRight">rotateInDownRight</option>
                  <option className="rotateInUpLeft">rotateInUpLeft</option>
                  <option className="rotateInUpRight">rotateInUpRight</option>
                </optgroup>

                <optgroup label="Rotating Exits">
                  <option className="rotateOut">rotateOut</option>
                  <option className="rotateOutDownLeft">rotateOutDownLeft</option>
                  <option className="rotateOutDownRight">rotateOutDownRight</option>
                  <option className="rotateOutUpLeft">rotateOutUpLeft</option>
                  <option className="rotateOutUpRight">rotateOutUpRight</option>
                </optgroup>

                <optgroup label="Specials">
                  <option className="hinge">hinge</option>
                  <option className="jackInTheBox">jackInTheBox</option>
                  <option className="rollIn">rollIn</option>
                  <option className="rollOut">rollOut</option>
                </optgroup>

                <optgroup label="Sliding Entrances">
                  <option className="slideInDown">slideInDown</option>
                  <option className="slideInLeft">slideInLeft</option>
                  <option className="slideInRight">slideInRight</option>
                  <option className="slideInUp">slideInUp</option>
                </optgroup>

                <optgroup label="Sliding exits">
                  <option className="slideOutDown">slideOutUp</option>
                  <option className="slideOutLeft">slideOutDown</option>
                  <option className="slideOutRight">slideOutLeft</option>
                  <option className="slideOutUp">slideOutRight</option>

                </optgroup>

                <optgroup label="Zooming entrances">
                  <option className="zoomIn">zoomIn</option>
                  <option className="zoomInDown">zoomInDown</option>
                  <option className="zoomInLeft">zoomInLeft</option>
                  <option className="zoomInRight">zoomInRight</option>
                  <option className="zoomInUp">zoomInUp</option>
                </optgroup>

                <optgroup label="Zooming exits">
                  <option className="zoomOut">zoomOut</option>
                  <option className="zoomOutDown">zoomOutDown</option>
                  <option className="zoomOutLeft">zoomOutLeft</option>
                  <option className="zoomOutRight">zoomOutRight</option>
                  <option className="zoomOutUp">zoomOutUp</option>
                </optgroup>
              </select>

              <button className="grow w-44 rounded-md bg-indigo-600 border border-transparent py-2 px-3 text-sm font-semibold leading-5 text-white hover:bg-indigo-500 js--triggerAnimation" type="button" onClick={() => triggerAnimation(animationType)}>Animate Me !</button>
            </div>

          </div>
        </div>
      </div>

    </>
  )
};

export default Animation