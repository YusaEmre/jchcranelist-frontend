import DatePicker from 'react-datepicker';

const SlideSettings = ({
  slideEnd,
  slideStart,
  setSlideEnd,
  setSlideStart,
  speed,
  setSpeed,
}) => {
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Slide Show Settings
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label> Slide Start Month:</label>
            <DatePicker
              selected={slideStart}
              minDate={new Date('07-01-2022')}
              onChange={(date) => setSlideStart(date)}
              selectsStart
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <label className="mt-2"> Slide End Month:</label>
            <DatePicker
              selected={slideEnd}
              minDate={new Date('07-01-2022')}
              selectsStart
              onChange={(date) => setSlideEnd(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <label for="customRange3" class="form-label mt-2">
              Slide Speed : {speed} second
            </label>
            <input
              type="range"
              class="form-range"
              min="0"
              max="60"
              step="5"
              id="customRange3"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            ></input>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlideSettings;
