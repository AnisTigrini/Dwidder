import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const listOfImages = [
    "https://cliparting.com/wp-content/uploads/2018/03/cool-pictures-2018-3.jpg",
    "https://image.winudf.com/v2/image1/Y29tLmZyZXNoZW52aXJvbm1lbnQuY29vbHdhbGxwYXBlcnNoZF9zY3JlZW5fMF8xNTk4OTcwMDU3XzA3MQ/screen-0.jpg?fakeurl=1&type=.webp",
    "https://www.pixelstalk.net/wp-content/uploads/images4/Cool-Wallpapers-HD.jpg",
    "https://wallpaper.dog/large/20511948.jpg",
    "https://cdn.wallpapersafari.com/78/64/Hdo1WP.jpg",
    "https://wallpapers.com/images/high/cool-sasuke-silhouette-lc25i40g70n0ben0.jpg",
    "https://www.enwallpaper.com/wp-content/uploads/Cool-Wallpapers-for-Phone.jpg",
    "https://wallpaperaccess.com/full/3437740.jpg",
    "https://wallpaperfordesktop.com/wp-content/uploads/2021/05/Cool-Wallpaper.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzEW6CSlhQ5MF5AhGuE9TzwZ9NsQyjd7VEvA&usqp=CAU",
    "https://www.nawpic.com/media/2020/cool-for-boys-nawpic-2.jpg"

]

const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
}

export default function AlignItemsList(props) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        props.messageList ?
        props.messageList.map((m, i) => {
          return (
            <Grid container key={i}>
              <Grid item xs={12}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={listOfImages[getRandomNumber()]} />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Dwidder User
                        </Typography>
                        {" — " + m}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="inset" component="li" />
              </Grid>
          </Grid>
          )
        })
        :
        props.contributorsList[0].map((m, i) => {
          return (
            <Grid container key={i}>
              <Grid item xs={12}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={listOfImages[getRandomNumber()]} />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {m}
                        </Typography>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.warning"
                        >
                          Total contribution : {props.contributorsList[1][i]} Dweed
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="inset" component="li" />
              </Grid>
          </Grid>
          )
        })
      }
    </List>
  );
}
