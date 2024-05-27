import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Switch,
  Box,
  TableSortLabel,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

const TableComponent = ({
  data,
  columns,
  handleView,
  handleEdit,
  handleDelete,
  handleStatusChange,
  handleSort,
  sortOrder,
  sortColumn,
}) => {
  return (
    <TableContainer>
      <Table>
      <TableHead>
      <TableRow>
        {columns?.map((column) => (
          <TableCell key={column.id} sx={{ width: column.width || 200 }}>
            <TableSortLabel
              active={sortColumn === column.id}
              direction={sortOrder}
              onClick={() => handleSort(column.id)}
              sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              {columns?.map((column) => (
                <TableCell key={column.id}>
                  {column.id === 'status' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: item.status ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      {item.status ? (
                        <>
                          <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
                          <Typography color="success.main">Active</Typography>
                        </>
                      ) : (
                        <>
                          <InfoIcon sx={{ color: 'error.main', mr: 1 }} />
                          <Typography color="error.main">Inactive</Typography>
                        </>
                      )}
                      <Switch
                        checked={item.status}
                        onChange={() => handleStatusChange(item.id)}
                        color={item.status ? 'success' : 'error'}
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  ) : (
                    item[column.id]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleView(item.id)}>
                  <RemoveRedEyeIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(item.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon sx={{ color: 'error.main' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
