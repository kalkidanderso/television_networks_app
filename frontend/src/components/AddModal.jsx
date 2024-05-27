import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Switch } from '@mui/material';

const AddComponent = ({ open, onClose, onSave, fields }) => {
  const [formData, setFormData] = useState({});

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
          Add New Item
        </Typography>
        {fields.map((field) => (
          <React.Fragment key={field.name}>
            {field.name === 'status' ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography>Status:</Typography>
                <Switch
                  checked={formData[field.name] || false}
                  onChange={(e) => handleChange(field.name, e.target.checked)}
                  color="primary"
                  sx={{ ml: 2 }}
                />
              </Box>
            ) : (
              <TextField
                label={field.label}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          </React.Fragment>
        ))}
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddComponent;
