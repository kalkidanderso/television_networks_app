import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Switch } from '@mui/material';

const EditModal = ({ open, onClose, entity, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    }
  }, [entity]);

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

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
          Edit {entity && entity.type}
        </Typography>
        {Object.keys(formData).map((key) => (
          key !== 'status' && (
            <TextField
              key={key}
              label={key}
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              fullWidth
              margin="normal"
            />
          )
        ))}
        {formData.hasOwnProperty('status') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography>Status:</Typography>
            <Switch
              checked={formData.status}
              onChange={() => handleChange('status', !formData.status)}
              color={formData.status ? 'success' : 'error'}
              sx={{ ml: 2 }}
            />
          </Box>
        )}
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
