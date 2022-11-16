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
  const [delegate, setDelegate] = useState("");
  const [groupnumber, setGroupnumber] = useState("");
  const [vote1, setVote1] = useState("");
  const [vote2, setVote2] = useState("");
  const [vote3, setVote3] = useState("");
  const [vote4, setVote4] = useState("");
  const [vote5, setVote5] = useState("");
  const [vote6, setVote6] = useState("");
  const [accountname, setAccountName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nodeRef = useRef(null);

  const sign = async () => {
    if (activeUser) {
      try {
        const transaction = {
          actions: [
            {
              account: "eden.fractal",
              name: "sign",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                signer: displayaccountname(),
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
  };

  const vote = async () => {
    if (activeUser) {
      // could be more elegant than if (vote6 == "")
      if (vote6 == "") {
        let voterlist = [vote5, vote4, vote3, vote2, vote1];
        try {
          const transaction = {
            actions: [
              {
                account: "eden.fractal",
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
                  rankings: voterlist,
                },
              },
              {
                account: "edenfractest",
                name: "electdeleg",
                authorization: [
                  {
                    actor: displayaccountname(), // use account that was logged in
                    permission: "active",
                  },
                ],
                data: {
                  elector: displayaccountname(),
                  delegate: delegate,
                  groupnr: parseInt(groupnumber),
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
      } else {
        let voterlist = [vote6, vote5, vote4, vote3, vote2, vote1];
        console.log(voterlist);
        try {
          const transaction = {
            actions: [
              {
                account: "eden.fractal",
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
                  rankings: voterlist,
                },
              },
              {
                account: "edenfractest",
                name: "electdeleg",
                authorization: [
                  {
                    actor: displayaccountname(), // use account that was logged in
                    permission: "active",
                  },
                ],
                data: {
                  elector: displayaccountname(),
                  delegate: delegate,
                  groupnr: parseInt(groupnumber),
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
    }
  };
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

      <div class="zeos">ZEOS<br/><div class="fractal">FRACTAL</div></div>
      <img src="zeoslogo.svg" width="10%" class="logo"/>
      <button class="button-64 votebutton" role="button" onClick={() => setLanding(true)}><span class="text">Vote</span></button>
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
            Eden Contributor Agreement{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Agreement could be accessed via this{" "}
            <a
              href="https://eosauthority.com/account/edenfractest?network=eos&scope=edenfractest&table=agreement&limit=10&index_position=1&key_type=i64&reverse=0&mode=contract&sub=tables"
              target="_blank"
            >
              {" "}
              link
            </a>
            . By clicking sign you agree to the terms of the agreement.
          </Typography>
          <br></br>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => sign()}
          >
            Sign
          </Button>
        </Box>
      </Modal>
      <div class="main-menu">
          <button onClick={handleOpen} className="menu-trigger">
                    <span>Sign the agreement</span>
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
      <div class="input-wrapper-top">
        <div class="input-wrapper">
          <input onChange={(e) => setDelegate(e.target.value)} spellcheck="false" class="input-field input-top" placeholder="Delegate"></input>
        </div>
        <div class="input-wrapper">
          <input onChange={(e) => setGroupnumber(e.target.value)} spellcheck="false" class="input-field input-top2" placeholder="Group number"></input>
        </div>
      </div>
      <div class="input-wrapper">
        <input onChange={(e) => setVote1(e.target.value)} spellcheck="false" class="input-field" placeholder="Level 6"></input>
      </div>
      <div class="input-wrapper">
        <input onChange={(e) => setVote2(e.target.value)} spellcheck="false" class="input-field" placeholder="Level 5"></input>
      </div>
      <div class="input-wrapper">
        <input onChange={(e) => setVote3(e.target.value)} spellcheck="false" class="input-field" placeholder="Level 4"></input>
      </div>
      <div class="input-wrapper">
        <input onChange={(e) => setVote4(e.target.value)} spellcheck="false" class="input-field" placeholder="Level 3"></input>
      </div>
      <div class="input-wrapper">
        <input onChange={(e) => setVote5(e.target.value)} spellcheck="false" class="input-field" placeholder="Level 2"></input>
      </div>
      <div class="input-wrapper">
        <input onChange={(e) => setVote6(e.target.value)} spellcheck="false" class="input-field" placeholder="Level 1"></input>
      </div>
      <button class="button-64" role="button" onClick={() => vote()}><span class="text">Submit</span></button>
      </header>
      </div>
      </CSSTransition>
    
    </div>
    
  );
}

export default withUAL(App);
