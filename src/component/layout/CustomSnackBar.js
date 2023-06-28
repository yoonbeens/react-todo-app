import React from 'react';
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const CustomSnackBar = ({ open }) => {
  const vertical = 'top';
  const horizontal = 'center';

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      style={{ marginTop: '150px' }}
      open={open}
      autoHideDuration={4000}
      key={vertical + horizontal}
    >
      <Alert severity="error" sx={{
        width: '500px',
        padding: '20px',
        fontSize: '24px',
      }}>
        <AlertTitle>Error</AlertTitle>
            이미 로그인 중입니다.<br/> 자동으로 홈 화면으로 이동합니다.
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;