import BasicGrid from "./components/basicGrid";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import DenseAppBar from "./components/header";

function App() {
  if (typeof window.ethereum === undefined) {
    return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Ethereum not enabled by browser.</Alert>
    </Stack>
    )
  } 

  return (
    <>
      <DenseAppBar></DenseAppBar>
      <BasicGrid></BasicGrid>
    </>

  );
}

export default App;
