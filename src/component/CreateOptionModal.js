import React, { useState } from 'react';

const CreateOption = ({ options }) => {
  const [optionsAr, setOptionsAr] = useState(options);
  const [optionColor, setOptionColor] = useState('#9E9FE0');
  const [optionLabel, setOptionLabel] = useState();

  const handleAddOption = () => {
    const option = { label: optionLabel, color: optionColor };
    setOptionsAr([...optionsAr, option]);
  };

  const renderOptions = () => {
    return optionsAr.map((option) => {
      return (
        <div className="row mb-2">
          <div className="col-3">
            {' '}
            <input
              class="form-control "
              type="text"
              placeholder="Option"
              defaultValue={option.label}
              aria-label="default input example"
            />
          </div>
          <div className="col-2">
            <input
              type="color"
              class="form-control form-control-color"
              id="exampleColorInput"
              defaultValue={option.color}
              title="Choose option color"
            />
          </div>
          <div className="col-2">
            <i className="btn bi bi-trash"></i>
          </div>
        </div>
      );
    });
  };
  return (
    <div
      class=" modal modal-dialog-scrollable fade"
      id="createModal"
      tabindex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createModalLabel">
              Vehicle Status Settings
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body ">
            {renderOptions()}
            <div className="justify-content-center">
              <hr className="hr"></hr>
              <h3> Create New Status</h3>
              <div className="row mt-2">
                <div className="col-3">
                  <input
                    class="form-control"
                    type="text"
                    value={optionLabel}
                    onChange={(e) => {
                      setOptionLabel(e.target.value);
                    }}
                    placeholder="Option"
                    aria-label="default input example"
                  />
                </div>
                <div className="col-2">
                  <input
                    type="color"
                    class="form-control form-control-color"
                    id="exampleColorInput"
                    value={optionColor}
                    onChange={(e) => setOptionColor(e.target.value)}
                    title="Choose option color"
                  />
                </div>
                <div className="col-1">
                  <i
                    onClick={handleAddOption}
                    className="bi bi-plus-square btn m-0 p-0"
                    style={{ fontSize: '1.5rem' }}
                  ></i>
                </div>
              </div>
            </div>
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
export default CreateOption;
