import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const ViewDetailsModal = ({ open, onClose, entity }) => {
  if (!entity) return null;

  const labelWidth = 100; 

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {entity.type} Details
        </Typography>
        {Object.entries(entity).map(([key, value]) => (
          <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ minWidth: labelWidth }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Typography>
            <Typography variant="body1">{value.toString()}</Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default ViewDetailsModal;
