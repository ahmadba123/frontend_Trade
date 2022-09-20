import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
export default function AddTrade(props) {

    const [value, setValue] = useState({})
    // this function to put data in this input
    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }
    // this function to submit data and close popup
    const handleSubmit = (event) => {
        // console.log("add submit")
        event.preventDefault();
        props.addNewTrade(value)
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
                    <DialogTitle>Add new trade</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Deal"
                            label="Deal"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            name='Deal'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Login"
                            label="Login"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
                            name='Login'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Action"
                            label="Action"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            name='Action'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Entry"
                            label="Entry"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            name='Entry'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Symbol"
                            label="Symbol"
                            onChange={handleChange}
                            type="string"
                            fullWidth
                            variant="standard"
                            name='Symbol'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Price"
                            label="Price"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            name='Price'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Profit"
                            label="Profit"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            name='Profit'
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="Volume"
                            label="Volume"
                            onChange={handleChange}
                            type="number"
                            fullWidth
                            variant="standard"
                            name='Volume'
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