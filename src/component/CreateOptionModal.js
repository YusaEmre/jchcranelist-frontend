import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import CustomAxios from '../api/axios';

const CreateOption = ({ options, optionsAr, setOptionsAr, fetchData }) => {
  const [optionColor, setOptionColor] = useState('#9E9FE0');
  const [optionLabel, setOptionLabel] = useState();
  const [deletedStatuses, setDeletedStatuses] = useState([]);
  useEffect(() => {
    setOptionsAr(options);
  }, [options]);

  const handleAddOption = async (e) => {
    e.preventDefault();
    const option = { statusName: optionLabel, color: optionColor };
    setOptionsAr([...optionsAr, option]);
  };

  const handleSaveAllStatuses = async (e) => {
    e.preventDefault();
    const data = {
      workingStatusList: optionsAr,
      deletedWorkingStatusList: deletedStatuses,
    };
    try {
      await CustomAxios.post('workingstatus/saveAll', data);
      toast.info(`Changes are saved`, 1);
      fetchData();
    } catch (er) {
      toast.error(er.response.data.message, 1);
      setOptionsAr(options);
    }
    setDeletedStatuses([]);
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    setOptionsAr((optionsAr) => {
      const status = optionsAr[index];
      setDeletedStatuses([...deletedStatuses, status]);
      return optionsAr.filter((value, i) => i !== index);
    });
  };
  const handleOptionLabelChange = (e, option) => {
    let copyAr = optionsAr;

    copyAr.map((value, i) => {
      if (value.id === option.id) {
        copyAr[i] = {
          id: option.id,
          statusName: e.target.value,
          color: option.color,
          isActive: option.isActive,
        };
        console.log(copyAr[i].statusName);
      }
      setOptionsAr(copyAr);
    });
  };
  const handleOptionColorChange = (e, option) => {
    let copyAr = optionsAr;
    copyAr.map((value, i) => {
      if (value.id === option.id) {
        copyAr[i] = {
          id: option.id,
          statusName: option.statusName,
          color: e.target.value,
          isActive: option.isActive,
        };
        console.log(copyAr[i].color);
      }
      setOptionsAr(copyAr);
    });
  };
  const handleActiveChange = (e, option) => {
    let copyAr = optionsAr;
    copyAr.map((value, i) => {
      if (value.id === option.id) {
        copyAr[i] = {
          id: option.id,
          statusName: option.statusName,
          color: option.color,
          isActive: e.target.checked,
        };
        console.log(copyAr[i].isActive);
      }
      setOptionsAr(copyAr);
    });
  };
  const renderOptions = () => {
    return optionsAr.map((option, index) => {
      return option ? (
        <div key={option.id} className="row mb-2">
          <div className="col-3">
            {' '}
            <input
              class="form-control "
              type="text"
              placeholder="Option"
              onChange={(e) => handleOptionLabelChange(e, option)}
              defaultValue={option.statusName}
              aria-label="default input example"
            />
          </div>
          <div className="col-2">
            <input
              type="color"
              class="form-control form-control-color"
              id="exampleColorInput"
              defaultValue={option.color}
              onChange={(e) => handleOptionColorChange(e, option)}
              title="Choose option color"
            />
          </div>
          <div className="col-2 my-auto">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={(e) => handleActiveChange(e, option)}
                defaultChecked={option.isActive}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Active
              </label>
            </div>
          </div>
          <div className="col-2" onClick={(e) => handleDelete(e, index)}>
            <i className="btn bi bi-trash"></i>
          </div>
        </div>
      ) : (
        <></>
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
                    onClick={(e) => handleAddOption(e)}
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
              onClick={(e) => handleSaveAllStatuses(e)}
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};
export default CreateOption;
