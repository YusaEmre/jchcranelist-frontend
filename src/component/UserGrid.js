import moment from 'moment';
import React from 'react';

function UserGrid({ fetchedData, date }) {
  const handleTotalWorkingDays = (data) => {
    let totalWorkingDays = 0;
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      if (
        item.workingStatus.statusName !== '0' &&
        item.workingStatus.statusName !== 'BD' &&
        item.workingStatus.statusName !== 'AV'
      ) {
        totalWorkingDays++;
      }
    });
    return <td className="text-center">{totalWorkingDays}</td>;
  };
  return (
    <div>
      {fetchedData.length > 0 ? (
        <table className="table  table-striped table-bordered table-responsive overflow-y: hidden">
          <thead className="bg-light">
            <tr>
              <th
                className="text-center "
                colSpan={fetchedData[0].workingStatusList.length + 5}
                style={{ color: '#ec6e00' }}
              >
                <h5>{moment(date).format('MMMM')}</h5>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Fleet No</th>
              <th>Crane Model</th>
              <th>Size</th>
              <th>Operator</th>
              {fetchedData[0].workingStatusList.map((status) => (
                <th>{status.day + 1}</th>
              ))}
              <th>Total Working Days</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData &&
              fetchedData.map((data) => (
                <tr key={data.id}>
                  <td>{data.fleetNo}</td>
                  <td>{data.vehicleModel}</td>
                  <td>{data.size}</td>
                  <td>{data.operator}</td>
                  {data.workingStatusList.map((status) => (
                    <td>
                      <div className={status.workingStatus.statusName}>
                        {status.workingStatus.statusName}
                      </div>
                    </td>
                  ))}
                  {handleTotalWorkingDays(data.workingStatusList)}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">
          <h3>
            There is no vehicle created for{' '}
            <span style={{ color: '#ec6e00' }}>
              {moment(date).format('MMMM')}
            </span>
          </h3>
        </div>
      )}
    </div>
  );
}

export { UserGrid };
