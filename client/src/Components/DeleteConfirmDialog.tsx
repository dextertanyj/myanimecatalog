import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';

type Props = {
  open: boolean;
  title: string;
  content?: string;
  onSubmit: () => void;
  onClose: () => void;
};

export const DeleteConfirmDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle id="delete-dialog-title">
        <Typography>{props.title}</Typography>
      </DialogTitle>
      {props.content && (
        <DialogContent>
          <Typography>{props.content}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => props.onClose()}>Cancel</Button>
        <Button
          onClick={() => {
            props.onSubmit();
            props.onClose();
          }}
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
