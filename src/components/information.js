import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MessageContributors from './messageContributors';
import myContract from '../contractUtils';

export default function Information() {
  const [value, setValue] = React.useState('one');
  const [messageList, setMessageList] = React.useState([])
  const [contributorsList, setContributorsList] = React.useState([])

  React.useEffect(() => {
    const fetchMessageAndContributors = async () => {
      try {
        const messagesResponse = await myContract().methods.getMessages().call()
        const contributorsResponse = await myContract().methods.getContributors().call()
  
        setMessageList(messagesResponse)
        setContributorsList(contributorsResponse)
      } catch {
        alert("Make sure you are connected to GOERLI Ethereum network!")
      }
    }
    
    fetchMessageAndContributors()
    
  }, [])

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Messages" />
        <Tab value="two" label="Contributors" />
      </Tabs>
      {
        value === "one" ? <MessageContributors messageList={messageList} /> :
        <MessageContributors contributorsList={contributorsList} />
      }
    </Box>
    
  );
}
