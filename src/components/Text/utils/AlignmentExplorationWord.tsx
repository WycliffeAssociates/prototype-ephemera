import React from 'react';
import { Box, Typography } from '@mui/material';
import { AlignedText } from 'src/types';

interface AlignmentExplorationWordProps {
	versePhrase: AlignedText;
  	onPhraseClick: (words: AlignedText) => void;
}

const AlignmentExplorationWord: React.FC<AlignmentExplorationWordProps> = ({ versePhrase, onPhraseClick}) => {
  return (
    <Box
      onClick={() => {onPhraseClick(versePhrase)}}
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
      <Typography variant="h6">{versePhrase.text}</Typography>

      {versePhrase.greekAlignmentData ? 
        <React.Fragment>
          <Typography variant="body1">{versePhrase.greekAlignmentData[0].content}</Typography>
          <Typography variant="body1">{versePhrase.greekAlignmentData[0].lemma}</Typography>
          <Typography variant="body1">{versePhrase.greekAlignmentData[0].strong}</Typography>
        </React.Fragment>
      :
        <React.Fragment></React.Fragment>
      }

    </Box>
  );
};

export default AlignmentExplorationWord;