import { Grid, Input, Select } from 'react-spreadsheet-grid'

const rows=[
    { id: 'user1', name: 'John Doe', positionId: 'position1' },
];

export const MyAwesomeGrid = ()=>{
    return (
      <Grid 
        columns={[
          {
            title: () => 'Name', 
            value: (row, { focus }) => {
                return (
                    <Input  
                      value={row.name}
                      focus={focus}
                    />
                );
            }
          }, {
            title: () => 'Position',
            value: (row, { focus }) => {
                return (
                    <Select  
                      value={row.positionId}
                      isOpen={focus}
                    />
                );
            }
          }
        ]}
        getRowKey={row => row.id}
      />
    )
  
}