import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { IUser } from "@/common/user";

interface ProfileCardProps {
  user: IUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" component="div">
              Email:
            </Typography>
            <Typography variant="body1" component="div">
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" component="div">
              Username:
            </Typography>
            <Typography variant="body1" component="div">
              {user.username}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" component="div">
              Name:
            </Typography>
            <Typography variant="body1" component="div">
              {`${user.name.firstname} ${user.name.lastname}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" component="div">
              Phone:
            </Typography>
            <Typography variant="body1" component="div">
              {user.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="div">
              Address:
            </Typography>
            <Typography variant="body1" component="div">
              {`${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="div">
              Geolocation:
            </Typography>
            <Typography variant="body1" component="div">
              {`Latitude: ${user.address.geolocation.lat}, Longitude: ${user.address.geolocation.long}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
