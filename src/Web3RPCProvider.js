import Config from "./config"

export default function QryptoETHRPCProvider() { }

QryptoETHRPCProvider.prototype.contractCall = async function (params) {
    const callObj = params[0]
    const contractAddress = removeHexPrefix(callObj.to)
    const encodedData = removeHexPrefix(callObj.data)

    const ret = await window.qryptoProvider.rawCall(
      'callcontract',
      [contractAddress, encodedData]
    )

    return addHexPrefix(ret.executionResult.output)
}

QryptoETHRPCProvider.prototype.sendToContract = async function(tx) {
    const contractAddress = removeHexPrefix(tx.to)
    const encodedData = removeHexPrefix(tx.data)

    const ret = await window.qryptoProvider.rawCall(
      'sendtocontract',
      [contractAddress, encodedData]
    )

    return addHexPrefix(ret.txid)
}

QryptoETHRPCProvider.prototype.sendAsync = async function(payload, finished) {
  switch (payload.method) {
    case "net_version":
      end(null, Config.net_version)
      break;
    case "eth_call":
      if (!window.qryptoProvider) {
          end(new Error("window.qryptoProvider is undefined"))
          return
      }

      const val = await this.contractCall(payload.params)
      end(null, val)
      break;
    case "eth_sendTransaction":
      const tx = payload.params[0]
      if (isSendEther(tx)) {
        end(new Error("unsupport"))
      } else if (isCreateContract(tx)) {
        end(new Error("unsupport"))
      } else if (isCallContract(tx)) {
        const txHash = await this.sendToContract(tx)
        end(null, txHash)
      }
      break;
    case "eth_getTransactionReceipt":
      end(new Error("unsupport"))
      break;
    default:
      end(new Error("unsupport"))
  }

  function end(err, ret) {
    console.log("payload: ", payload)
    var resultObj = {
      id: payload.id,
      jsonrpc: payload.jsonrpc,
      result: ret,
    }
    if (err != null) {
      resultObj.error = {
        message: err.stack || err.message || err,
        code: -32000
      }
      console.log("error: ", err, "resultObj", resultObj)
      finished(err, resultObj)
    } else {
      console.log("resultObj", resultObj)
      finished(null, resultObj)
    }
  }
}

// Handle incoming messages
function handleMessage(message) {
  if (message.data.target === 'qrypto-inpage') {
    // result: object
    // error: string
    const { result, error } = message.data.message.payload;

    if (error) {
      if (error === 'Not logged in. Please log in to Qrypto first.') {
        // Show an alert dialog that the user needs to login first
        alert(error);
      } else {
        // Handle different error than not logged in...
        console.log(error)
      }
      return;
    }

    if (result) {
        console.log(result)
    }
  }
  console.log(message.data)
}

window.addEventListener('message', handleMessage, false);

function removeHexPrefix(hex) {
  if (hasHexPrefix(hex)) {
    return hex.substring(2)
  }

  return hex
}


function addHexPrefix(hex) {
  if (hasHexPrefix(hex)) {
    return hex
  }

  return "0x" + hex
}

function isSendEther(tx){
  return tx.value !== "" && tx.to !== "" && tx.from !== "" && tx.data === ""
}

function isCreateContract(tx){
  return tx.to === "" && tx.data !== ""
}

function isCallContract(tx){
  return tx.to !== "" && tx.data !== ""
}

function hasHexPrefix(hex) {
    return hex.startsWith("0x")
}
