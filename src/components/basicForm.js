import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Grid } from '@mui/material';
import myContract from "../contractUtils.js"
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "white",
  backgroundColor: "#4caf50"
};

export default function BasicForm() {
  const [textContent, setTextContent] = React.useState("")
  const [textError, setTextError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorText, setErrorText] = React.useState("")
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => 
    {
      setOpen(false);
    }

  const handleInput = (e) => {
    setTextContent(e.target.value)
  }

  const submitHandler = async () => {
    if (textContent.length === 0) {
      setTextError(true)
      setErrorText("Error! Message is empty.")
    } else {
      setTextError(false)
      setIsLoading(true)
      
      try {
        const accountList = await window.ethereum.request({method : 'eth_requestAccounts'})
        await myContract().methods.insertMessage(textContent).send({
          from: accountList[0],
          value: 10000000000000
        })

        setIsLoading(false)
        setOpen(true);
      } catch {
        setTextError(true)
        setIsLoading(false)
        setErrorText("An error occured with Metamask!")
        setTextContent("")
      }
    }
  }

  const myModal = (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your transaction succeded!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Congratulations! You just posted a message on Dwidder!
          </Typography>
        </Box>
      </Modal>
    </div>
  )

  return (
    <>
      <Grid container>
        <Grid item xs={12} minHeight={20}>
          {
            isLoading ? 
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
            :
            <></>
          }
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' color="text.primary" gutterBottom>
                Enter a Dwidd here (costs 10 000 Gwei)
              </Typography>
              <TextareaAutosize
                aria-label="message"
                onInput={handleInput}
                minRows={3}
                value={textContent}
                placeholder="Minimum 3 rows"
                style={{ width: "100%", height: "100px" , padding: "5px" }}
              />
            </CardContent>

            <Grid container>
              <Grid item md={4} xs={12}>
                <CardActions>
                  <Button onClick={submitHandler} variant="contained">Submit</Button>
                </CardActions>
              </Grid>

              <Grid alignItems="center" justifyContent="center" item md={8} xs={12} display="flex">
                {
                  textError ? <Typography color="#ef5350">{errorText}</Typography> : null
                }
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {myModal}
    </>
  );
}
