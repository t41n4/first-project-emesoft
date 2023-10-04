import React from "react";
import { Card, CardContent, Typography, Grid, Skeleton } from "@mui/material";

const ProfileCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          <Skeleton animation="wave" width={200} height={24} />
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" component="div">
              <Skeleton animation="wave" width={120} height={20} />
            </Typography>
            <Typography variant="body1" component="div">
              <Skeleton animation="wave" width={200} height={20} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" component="div">
              <Skeleton animation="wave" width={120} height={20} />
            </Typography>
            <Typography variant="body1" component="div">
              <Skeleton animation="wave" width={200} height={20} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="div">
              <Skeleton animation="wave" width={120} height={20} />
            </Typography>
            <Typography variant="body1" component="div">
              <Skeleton animation="wave" width={300} height={20} />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCardSkeleton;
