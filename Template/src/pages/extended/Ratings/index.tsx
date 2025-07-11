import { useState } from 'react';
import { Rate } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { PageBreadcrumb } from '../../../components';

const ResetRater = () => {
  const [ratingsCount, setRatingsCount] = useState<number>(2);

  const resetRating = () => {
    setRatingsCount(0);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Clear/Reset rater</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center">
          <Rate size='sm' value={ratingsCount} onChange={setRatingsCount} />
          <button id="raterreset-button" className="btn btn-sm bg-primary text-white ms-4" onClick={resetRating}>Reset</button>
        </div>
      </div>
    </div>
  )
}

const Ratings = () => {

  // on Hover Event
  const count = [1, 2, 3, 4, 5];
  const [hoverValue, setHoverValue] = useState<number>(1);

  //Random number between
  const [randomValue, setRandomValue] = useState<number>(0);

  const handleRandomValue = () => {
    const randomNumber = Math.floor(Math.random() * 5);
    setRandomValue(randomNumber)
  }

  return (
    <>
      <PageBreadcrumb name='Ratings' title='Ratings' breadCrumbItems={["Konrix", "Extended", "Ratings"]} />
      <div className="grid 2xl:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Rater Js Example</h4>
            </div>
          </div>
          <div className="p-6">
            <Rate size='sm' defaultValue={3} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">5 star rater with step</h4>
            </div>
          </div>
          <div className="p-6">
            <Rate size='sm' allowHalf defaultValue={1.5} />

          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Random Number Betweeen</h4>
            </div>
          </div>
          <div className="p-6">
            <Rate size='sm' onClick={handleRandomValue} value={randomValue} defaultValue={randomValue} />

          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">On hover Event</h4>
            </div>
          </div>
          <div className="p-6">
            <div>
              <Rate size='sm' onChangeActive={setHoverValue} defaultValue={1} />
              <span className="ratingnum inline-block text-center rounded-full w-6 h-full text-sm bg-info text-white align-middle ms-2">{count[hoverValue - 1]}</span>
            </div>
          </div>
        </div>
        <ResetRater />
      </div>
    </>
  )
};

export default Ratings