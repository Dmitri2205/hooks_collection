import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack/Stack';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import {Alert} from '@mui/material/';


export default function AppleConfirmation({ 
  message,
  closeAlert,
  open
}:{
  message:any,
  closeAlert:()=>void,
  open:boolean
}) {

  console.log("Apple open:" + open)


  return (
    <Stack>
      <Snackbar open={open} onClose={(e)=>closeAlert()}>
        <Alert onClose={(e)=>closeAlert()} severity="info" sx={{ width: '100%' }}>
          {message}
          <Button>Ok</Button>
          <Button onClick={(e)=>closeAlert()}>Cancel</Button>
        </Alert>
      </Snackbar>
    </Stack>
  );
}