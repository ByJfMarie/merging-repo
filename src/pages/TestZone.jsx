import React from 'react'
import EditableTable from "../components/EditableTable";

export default function MultiSelectSort() {
  const headers = ['user', 'description'];

  const createData = (user, description ) => ({
    id: user.replace(" ", "_"),
    user,
    description,
    isEditMode: false
  });

  const [rows] = React.useState([
    createData("Frozen yoghurt", 159),
    createData("Ice cream sandwich", 237),
    createData("Eclair", 262)
  ]);

  return (
    <>
      <EditableTable headers={headers} rows={rows} actions/>
    </>
  );
}
