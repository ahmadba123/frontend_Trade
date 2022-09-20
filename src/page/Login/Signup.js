import React, { useState } from 'react'
// import * as React from 'react';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function AddTrade(props) {
    const [value, setValue] = useState({})
    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }
    //this function for submit and close this popup
    const handleSubmit = (event) => {
        console.log("add submit")
        event.preventDefault();
        props.signup(value)
        props.handleClose();
    }

    return (
        <div className="addDriver-container">
            <form method="POST">
                <Dialog
                    TransitionComponent={props.Transition}
                    open={props.open}
                    onClose={props.handleClose}
                >
                    <DialogTitle>signup</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="name"
                            onChange={handleChange}
                            type="string"
                            fullWidth
                            variant="standard"
                            name='name'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="userName"
                            label="userName"
                            onChange={handleChange}
                            type="string"
                            fullWidth
                            variant="standard"
                            InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
                            name='userName'

                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="password"
                            onChange={handleChange}
                            type="password"
                            fullWidth
                            variant="standard"
                            name='password'
                        />
                    </DialogContent>
                    
                    <DialogActions>
                        <Button type="submit" onClick={handleSubmit}>Save</Button>
                        <Button onClick={props.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    )

}