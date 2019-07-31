import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import NewIcon from "@material-ui/icons/Add";

export default class NewDialog extends Component {
  state = {
    open: false,
    form: {}
  };

  valueChanges = (property, value) => {
    let form = this.state.form;

    form[property] = value;    
    this.setState({ form });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props.fields)
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <NewIcon />
          <Typography>Nuevo</Typography>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            {Object.keys(this.props.fields).map(key => {
              if (
                !this.props.fields[key].type ||
                this.props.fields[key].type === "TextField"
              ) {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id={key}
                    key={key}
                    label={key.toLocaleUpperCase()}
                    type="text"
                    onChange={ev => {
                      this.valueChanges(key, ev.target.value);
                    }}
                    fullWidth
                  />
                );
              } else if (this.props.fields[key].type === "Select") {
                return (
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor={"select" + key}>
                      {key.toUpperCase()}
                    </InputLabel>
                    <Select
                      value={this.state.form[key] || "default"}
                      id={"select" + key}
                      onChange={ev => {
                        this.valueChanges(key, ev.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value="default">
                        <em>Seleccionar</em>
                      </MenuItem>
                      {this.props.fields[key].options.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.value}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              } else {
                return <div>{this.props.fields[key]}</div>;
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                this.handleClose();
                this.props.register(this.state.form);
              }}
              color="primary"
            >
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
