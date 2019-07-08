import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';

export default class EditDialog extends Component{
  state = {
    open: false,
    form:{}
  };

  valueChanges = (property,value)=>{
    let form = this.state.form;
    form[property] = value;
    this.setState({form});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render(){
    if(!this.props.item){
      // Return nothing
      return (
        <div></div>
      )
    }
    return(
      <div>
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          {Object.keys(this.props.fields).map(key=>{
            if(!this.props.fields[key].type || this.props.fields[key].type ==="TextField"){
              return (
                <TextField autoFocus margin="dense" id={key} key={key} label={key.toLocaleUpperCase()} type="text" 
                defaultValue={this.props.item[key]}
                onChange={(ev)=>{this.valueChanges(key,ev.target.value)}}
                fullWidth/>
              )
            }else if(this.props.fields[key].type === "Select"){
              let defaultIndex = this.props.fields[key].options.findIndex(el=>el.value == this.props.item[key]);
              console.log( this.props.fields[key].options[defaultIndex]);
              return(
                <FormControl fullWidth>
                  <InputLabel shrink htxmlFor={'select'+key}>
                    {key.toUpperCase()}
                  </InputLabel>
                  <Select
                  value={this.state.form[key] || this.props.fields[key].options[defaultIndex].id}
                  id={'select'+key}
                  onChange={(ev)=>{this.valueChanges(key,ev.target.value)}}
                  fullWidth>
                  {this.props.fields[key].options.map(item=>{
                    return(
                      <MenuItem value={item.id}>{item.value}</MenuItem>
                      )
                    })
                  }
                  </Select>
                </FormControl>
              )
            }else{
              return (<div>{this.props.item[key]}</div>)
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={
            ()=>{
              this.props.handleClose();
              this.props.edit(defaultOrChangedData(this.state.form,this.props.item,this.props.fields))
            }
          } color="primary">
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

function defaultOrChangedData(updated,defaultData,fields){
  let itemToSend = updated;
  console.log(itemToSend);
  Object.keys(fields).forEach(key=>{
    if(!itemToSend[key]){
      itemToSend[key] = defaultData[key];
    }
  })
  itemToSend['_id'] = defaultData['_id'];
  return itemToSend;
}