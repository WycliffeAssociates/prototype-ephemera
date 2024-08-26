import React from 'react';
import { Box, Typography } from '@mui/material';

interface AlignmentExplorationWordProps {
  english: string;
  greek?: string;
  lemma?: string;
  strong?: string;
}

const AlignmentExplorationWord: React.FC<AlignmentExplorationWordProps> = ({ english, greek, lemma, strong }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        border: '1px solid #ccc',
        padding: '8px',
        marginRight: '8px',
        marginBottom: '8px',
        textAlign: 'center',
        minWidth: 'max-content',
      }}
    >
      <Typography variant="h6">{english}</Typography>
      <Typography variant="body1">{greek}</Typography>
      <Typography variant="body1">{lemma}</Typography>
      <Typography variant="body1">{strong}</Typography>

    </Box>
  );
};

export default AlignmentExplorationWord;