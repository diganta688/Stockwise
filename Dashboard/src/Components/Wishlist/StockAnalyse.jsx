import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function StockAnalyse({stockInfo, setIsMouseEnter}) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);  
    setIsMouseEnter(false)  
  };
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={false}
          PaperProps={{
            style: {
              width: "900px",
              maxWidth: "900px",
            },
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <iframe
                referrerPolicy="origin"
                width="100%"
                height="470"
                style={{
                  background: "#FFFFFF",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
                }}
                src={`https://jika.io/embed/area-chart?symbol=${stockInfo.name}&selection=all&closeKey=close&boxShadow=true&graphColor=1652f0&textColor=161c2d&backgroundColor=FFFFFF&fontFamily=Nunito`}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
