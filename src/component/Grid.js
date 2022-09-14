import { Grid, Input, Select } from 'react-spreadsheet-grid'

const rows = [
  { id: 'user1', name: 'John Doe', positionId: 'position1' },
];

export const MyAwesomeGrid = () => {
  return (

    rows.map((rowa) => {
      <Grid
        columns={[
          {
            title: () => rowa.id,
            value: (rowa, { focus }) => {
              return (
                <Input
                  value={rowa.name}
                  focus={focus}
                />
              );
            }
          },
          {
            title: () => rowa.name,
            value: (rowa, { focus }) => {
              return (
                <Input
                  value={rowa.name}
                  focus={focus}
                />
              );
            }
          }]

        }
        getRowKey={row => row.id}
      />
    })
  )
}