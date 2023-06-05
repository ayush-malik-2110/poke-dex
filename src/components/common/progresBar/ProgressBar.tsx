import { normalise } from '../../../util/utils'

import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <ProgressBarWrapper>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="black">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

export default function ProgressBar({ min, max, value }: {min: number, max: number, value: number} ) {
  const progress = normalise(value, min, max);
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
