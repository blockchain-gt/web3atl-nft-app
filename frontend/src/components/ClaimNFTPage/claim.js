import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "../../mintNFTABI.json";
import "./claim.css";
import web3 from "web3"
const contractAddress = "0xa1a326B2299418F17928e74F3Fd347078992DbB2";

function App() {
  const [isHacker, setIsHacker] = useState(false);
  const [isGeneral, setIsGeneral] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [proof, setProof] = useState(null);
  const [type, setType] = useState(null);

  return (
    <div>
      <div class="">
        <div class="d-flex justify-content-end outeredge">
          <button
            type="button"
            id="connect-metamask"
            class="d-flex btn btn-outline-primary row justify-content-center text-black connect-wallet"
            onClick={async () => {
              if (window.ethereum && window.ethereum.isMetaMask) {
                const btn = document.getElementById("connect-metamask");
                btn.addEventListener("click", () => {
                  window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((accounts) => {
                      let account = accounts[0];
                      btn.innerText =
                        account.slice(0, 6) +
                        "..." +
                        account.slice(account.length - 5);
                      sessionStorage.setItem("account", account);
                    });
                });
                let tempProvider = new ethers.providers.Web3Provider(
                  window.ethereum
                );
                setProvider(tempProvider);

                let tempSigner = tempProvider.getSigner();
                setSigner(tempSigner);

                let tempContract = new ethers.Contract(
                  contractAddress,
                  abi,
                  tempSigner
                );
                setContract(tempContract);
              } else {
                console.log("Need to install MetaMask");
              }
            }}
          >
            Connect Wallet
          </button>
        </div>
        <div class="d-flex justify-content-center text-center">
          <h1 class="font header">WEB3 ATL GENESIS NFTs</h1>
        </div>
        <div class="d-flex justify-content-center">
          <h1 id="text">Enter your email address:</h1>
        </div>
        <div class="d-flex justify-content-center">
          <div class="d-flex justify-content-center text-area" id="text-area">
            <div class="d-flex flex-column justify-content-center">
              <input
                id="email-box"
                type="text"
                class="text-option-box"
                onClick={async () => {
                  const emailBox = document.getElementById("email-box");
                  const invalidEmail = document.getElementById(
                    "invalidemail-error-message"
                  );
                  const discordlink = document.getElementById(
                    "discordlink-error-message"
                  );
                  const discord = document.getElementById(
                    "discord-error-message"
                  );
                }}
                placeholder="test@example.com"
              />
              <button
                class="btn btn-primary mb-4 mx-12"
                onClick={() => {
                    const emailBox = document.getElementById("email-box");
                    const invalidEmail = document.getElementById(
                    "invalidemail-error-message"
                    );
                    const discordlink = document.getElementById(
                      "discordlink-error-message"
                    );
                    const discord = document.getElementById(
                      "discord-error-message"
                    );
                    fetch(
                      "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/verifyEmail?param=" + emailBox.value
                    )
                      .then((response) => response.json())
                      .then((json) => {
                        const content = json.split(",")[0];
                        setType(content)
                        console.log(content)
                        if(content === "team") {
                          emailBox.style.border = "1px solid black";
                          emailBox.style.background = "#FFFFFF";
                          discordlink.style.display = "none";
                          discord.style.display = "none";
                          setIsEmailValid(true);
                          setIsTeam(true);
                          setIsSpeaker(false);
                          setIsHacker(false);
                          setIsGeneral(false);
                          invalidEmail.style.display = "none";
                          return;
                        }
                        if(content === "speaker") {
                          emailBox.style.border = "1px solid black";
                          emailBox.style.background = "#FFFFFF";
                          discordlink.style.display = "none";
                          discord.style.display = "none";
                          setIsEmailValid(true);
                          setIsTeam(false);
                          setIsSpeaker(true);
                          setIsHacker(false);
                          setIsGeneral(false);
                          invalidEmail.style.display = "none";
                          return;
                        }
                        if(content === "hacker") {
                          emailBox.style.border = "1px solid black";
                          emailBox.style.background = "#FFFFFF";
                          discordlink.style.display = "none";
                          discord.style.display = "none";
                          setIsEmailValid(true);
                          setIsTeam(false);
                          setIsSpeaker(false);
                          setIsHacker(true);
                          setIsGeneral(false);
                          invalidEmail.style.display = "none";
                          return;
                        }
                        if(content === "general") {
                          emailBox.style.border = "1px solid black";
                          emailBox.style.background = "#FFFFFF";
                          discordlink.style.display = "none";
                          discord.style.display = "none";
                          setIsEmailValid(true);
                          setIsTeam(false);
                          setIsSpeaker(false);
                          setIsHacker(false);
                          setIsGeneral(true);
                          invalidEmail.style.display = "none";
                          return;
                        }
                        emailBox.style.border = "2px solid red";
                        emailBox.style.background = "#FED6D6";
                        invalidEmail.style.display = "flex";
                        discordlink.style.display = "flex";
                        discord.style.display = "flex";
                        setIsEmailValid(false);
                      });
  
                }}> Submit </button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <h6
            class="text-danger invalid-email-error-message"
            id="invalidemail-error-message"
          >
            Unrecognized Email
          </h6>
        </div>
        <div className="d-flex justify-content-center">
          <h6
            className="text-danger invalid-email-error-message"
            id="discordlink-error-message"
          >
            If you think this a mistake please reach out to
          </h6>
        </div>
        <div className="d-flex justify-content-center">
          <a
            className="text-decoration-none invalid-email-error-message"
            href="https://discord.gg/G7ZV5kFmd2"
            id="discord-error-message"
          >
            Our Discord
          </a>
        </div>

        <div
          class={isEmailValid === true ? "d-flex flex-column" : "hidden-fields"}
        >
          <div class="d-flex justify-content-center">
            <h3>Here is your role:</h3>
          </div>
          <div class="d-flex justify-content-center">
            <div class="option-box" id="option-box">
              <div class="d-flex">
                <div class={isGeneral === true ? "filled-circle" : "circle"} />
                <h5>General</h5>
              </div>
              <div class="d-flex">
                <div class={isSpeaker === true ? "filled-circle" : "circle"} />
                <h5>Speaker</h5>
              </div>
              <div class="d-flex">
                <div class={isTeam === true ? "filled-circle" : "circle"} />
                <h5>Team</h5>
              </div>
              <div class="d-flex">
                <div class={isHacker === true ? "filled-circle" : "circle"} />
                <h5>Hacker</h5>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <h6 class="text-danger error-message" id="error-message">
              {" "}
              Please Select a Option
            </h6>
            <h6 class="text-danger error-message" id="all-error-message">
              Please fill out all fields
            </h6>
            <h6 class="text-danger error-message" id="wallet-error-message">
              Please connect your wallet and fill out all fields
            </h6>
            <h6 class="text-danger error-message" id="tryagain-error-message">
              There was an error, please try again later.
            </h6>
            <h6 class="text-danger error-message" id="network-error-message">
              Please connect to the Optimism Network
            </h6>
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary btn-size"
              onClick={async () => {
                const option = document.getElementById("error-message");
                const both = document.getElementById("all-error-message");
                const invalidEmail = document.getElementById(
                  "invalidemail-error-message"
                );
                const wallet = document.getElementById("wallet-error-message");
                const emailBox = document.getElementById("email-box");
                const btn = document.getElementById("connect-metamask");
                const optionBox = document.getElementById("option-box");
                document.getElementById("network-error-message").style.display =
                  "none";
                if (
                  emailBox.value !== null &&
                  emailBox.value !== "" &&
                  isEmailValid &&
                  btn.innerText !== "Connect Wallet"
                ) {
                  option.style.display = "none";
                  both.style.display = "none";
                  invalidEmail.style.display = "none";
                  wallet.style.display = "none";
                  emailBox.style.border = "1px solid black";
                  emailBox.style.background = "#ffffff";
                  optionBox.style.border = "none";
                  optionBox.style.background = "none";
                  btn.style.border = "1px solid black";
                  btn.style.background = "#ffffff";

                  const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                  );
                  var text = "";
                  if (isTeam) {
                    text += "team";
                  } else if (isSpeaker) {
                    text += "speaker";
                  } else if (isHacker) {
                    text += "hacker";
                  } else {
                    text += "general";
                  }
                  if (window.ethereum.networkVersion === "10") {
                    document.getElementById(
                      "network-error-message"
                    ).style.display = "none";

                    const signer = provider.getSigner();
                    let contract = new ethers.Contract(
                      contractAddress,
                      abi,
                      signer
                    );
                    //get proof from the fetch
                    //change the format of teamMint
                    //remember string-> bytes32 for list of proof

                    fetch(
                      "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/generateProof?param=" +
                        emailBox.value + 
                        "&param=" +
                        text
                    ) .then((response) => response.json())
                      .then((json) => {   
                        setProof(json)
                      }
                    );
                    
                    var successfulTxn = false
                    if (isTeam) {
                      contract.teamMint(proof, emailBox.value.toLowerCase())
                      .then(tx => {
                        console.log("Minted Successfully")
                        fetch(
                         "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/updateAddress?param=" +
                         emailBox.value +
                         "&param=" +
                         text +
                          "&param=" +
                         sessionStorage.getItem("account")
                        );
                      }).catch(e => {
                        if(e.code == 4001) {
                          console.log("User Deny");
                        }
                      })
                    } else if (isSpeaker) {
                      contract.speakerMint(proof, emailBox.value.toLowerCase())
                      .then(tx => {
                        console.log("Minted Successfully")
                        fetch(
                         "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/updateAddress?param=" +
                         emailBox.value +
                         "&param=" +
                         text +
                          "&param=" +
                         sessionStorage.getItem("account")
                        );
                      }).catch(e => {
                        if(e.code == 4001) {
                          console.log("User Deny");
                        }
                      })
                    } else if (isHacker) {
                      contract.hackerMint(proof, emailBox.value.toLowerCase())
                      .then(tx => {
                        console.log("Minted Successfully")
                        fetch(
                         "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/updateAddress?param=" +
                         emailBox.value +
                         "&param=" +
                         text +
                          "&param=" +
                         sessionStorage.getItem("account")
                        );
                      }).catch(e => {
                        if(e.code == 4001) {
                          console.log("User Deny");
                        }
                      })
                    } else if (isGeneral) {
                      contract.generalMint(proof, emailBox.value.toLowerCase())
                      .then(tx => {
                        console.log("Minted Successfully")
                        fetch(
                         "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/updateAddress?param=" +
                         emailBox.value +
                         "&param=" +
                         text +
                          "&param=" +
                         sessionStorage.getItem("account")
                        );
                      }).catch(e => {
                        if(e.code == 4001) {
                          console.log("User Deny");
                        }
                      })
                    }
                  
                  } else {
                    document.getElementById(
                      "network-error-message"
                    ).style.display = "flex";
                  }
                } else if (
                  emailBox.value !== null &&
                  emailBox.value !== "" &&
                  isEmailValid &&
                  btn.innerText === "Connect Wallet"
                ) {
                  invalidEmail.style.display = "none";
                  both.style.display = "none";
                  option.style.display = "none";
                  wallet.style.display = "flex";
                  emailBox.style.border = "1px solid black";
                  emailBox.style.background = "white";
                  optionBox.style.border = "none";
                  optionBox.style.background = "none";
                  btn.style.border = "2px solid red";
                  btn.style.background = "#FED6D6";
                }
              }}
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
