import logo from "./logo.svg";
import "./App.css";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CSSTransition } from "react-transition-group";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

function App(props) {
  const [landing, setLanding] = useState(false);
  const [showButton, setShowButton] = useState(true);
  //const [delegate, setDelegate] = useState("");
  const [groupnumber, setGroupnumber] = useState("");
  const [vote1, setVote1] = useState("");
  const [vote2, setVote2] = useState("");
  const [vote3, setVote3] = useState("");
  const [vote4, setVote4] = useState("");
  const [vote5, setVote5] = useState("");
  const [vote6, setVote6] = useState("");
  const [data, setData] = useState({vote1:"", vote2:"", vote3:"", vote4:"", vote5:"",vote6:""})
  const [accountname, setAccountName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nodeRef = useRef(null);

  const vote = async() => {
    if(groupnumber){
      let votearray = [];
      console.log(data)
      Object.keys(data).map((keyName, i) => {
        let item = data[keyName]
        if(item.length > 0){
          votearray.push(item)
        }
      })
      console.log(votearray)
      if(activeUser){
        try {
          const transaction = {
            actions: [
              {
                account: "zeos.fractal",
                name: "submitcons",
                authorization: [
                  {
                    actor: displayaccountname(), // use account that was logged in
                    permission: "active",
                  },
                ],
                data: {
                  submitter: displayaccountname(),
                  groupnr: parseInt(groupnumber),
                  rankings: votearray,
                },
              },

            ],
          };
          await activeUser.signTransaction(transaction, {
            broadcast: true,
            expireSeconds: 300,
          });
          swal_success(`Successfully submitted!`);
        } catch (e) {
          swal_error(e);
        }
      }
      else{
        swal_error("Please log in first.")
      }
    }
    else{
      swal_error("Group number missing.")
    }
  }

  const swal_success = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      background: '#190087',
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "<div style='color:white'>" + message + "</div>",
    });
  };

  const swal_error = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      background: '#190087',
      timer: 8000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "<div style='color:white'>" + message + "</div>",
    });
  };

  const {
    ual: { showModal, hideModal, activeUser, login, logout },
  } = props;
  useEffect(() => {
    if (activeUser) {
      const accountName = activeUser.getAccountName();
      accountName.then(function (result) {
        setAccountName(result);
      });
    }
  }, [activeUser]);

  const displayaccountname = () => {
    if (accountname) {
      return accountname;
    }
  };

  const logmeout = () => {
    logout();
    setAccountName("");
  };

  const setVote = (value, key) => {
    let datatemp = data;
    datatemp[key] = value;
    setData(datatemp)
  }

  /*
          <TextField
            onChange={(e) => setSubmitter(e.target.value)}
            label="Your name"
            variant="outlined"
            sx={{ width: "100%", "margin-bottom": "10px" }}
          />
          */

  return (
    <div className="App">
      {showButton &&
        <header className="App-header">

          <div class="zeos">ZEOS<br /><div class="fractal">FRACTAL</div></div>
          <img src="zeoslogo.svg" width="10%" class="logo" />
          <button class="button-64 votebutton" role="button" onClick={() => setLanding(true)}><span class="text">Continue</span></button>
          <div class="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
          </div>
        </header>
      }
      <CSSTransition
        in={landing}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
      >
        <div ref={nodeRef}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Invitation process{" "}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {" "}
                <a
                  href="https://www.youtube.com/watch?v=tybOi4hjZFQ"
                  target="_blank"
                >
                  {" "}
                  Under development
            </a>
            .
          </Typography>
              <br></br>
              <button class="button-64 buttonwidth" role="button"

                variant="contained"
                sx={{ width: "100%" }}
              //onClick={() => sign()}
              >
                Invite
                </button>
            </Box>
          </Modal>
          <div class="main-menu">
            <button onClick={handleOpen} className="menu-trigger">
              <span>Invite members</span>
            </button>
            {accountname == "" ? (
              <button onClick={() => showModal()} className="menu-trigger">
                <span>Sign in</span>
              </button>
            ) : (
                <button onClick={() => logmeout()} className="menu-trigger">
                  <span>{displayaccountname()}</span>
                </button>
              )}
          </div>

          <header className="App-header">
          <div class="input-wrapper">
              <input onBlur={(e) => setGroupnumber(e.target.value)} spellcheck="false" class="input-field" placeholder="Group Number"></input>
          </div>
            {Object.keys(data).map((key, index) => (
            <div class="input-wrapper">
              <input onBlur={(e) => setVote(e.target.value, key)} spellcheck="false" class="input-field" placeholder={"Level " + (index+1)}></input>
            </div>
            ))}
            <button class="button-64" role="button" onClick={() => vote()}><span class="text">Submit</span></button>
          </header>
        </div>
      </CSSTransition>

    </div>

  );
}

export default withUAL(App);
