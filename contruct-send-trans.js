document.getElementById("sendBtn").onclick = openTransferPopup;
let popup = null;

function openTransferPopup() {
  const sendbtn = document.getElementById("sendBtn");
  sendbtn.disabled = true;
  const amount = document.getElementById("amountInput").value;
  const recipient = document.getElementById("sendToInput").value;
  const token = document.getElementById("tokenSelect").value;
  if (popup == null || popup.closed) {
    popup = window.open("", "MetaMaskPopup", "width=400,height=600");
  }

  popup.document.open(); // 清空旧内容
  popup.document.write(`
    <html>
      <head>
        <title>转账请求</title>
        <style>
          h2 { text-align: center; font-size: 24px; margin-top: 20px; }
              .container { padding: 20px; }
              .address { background: #eee; padding: 10px; border-radius: 5px; font-family: monospace; }
              .amount { font-weight: bold; margin: 10px 0; }
              .btn { margin: 10px 5px; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
              .confirm { background: #4caf50; color: white; }
              .reject { background: #f44336; color: white; }
        </style>
      </head>
      <body>
        <h2>Confirm Transaction</h2>
        <p>Send <strong>${amount} ${token}</strong> to:</p>
        <div class="address">${recipient}</div>
        <button id="confirmBtn">Confirm</button>
        <button id="rejectBtn">Reject</button>

        <script>
          document.getElementById("confirmBtn").onclick = function() {
            window.opener.postMessage({ status: "confirmed" }, "*");
            window.close();
          }
          document.getElementById("rejectBtn").onclick = function() {
            window.opener.postMessage({ status: "rejected" }, "*");
            window.close();
          }
        <\/script>
      </body>
    </html>
  `);
}

window.addEventListener("message", function(event) {
  if (event.data.status === "confirmed") {
    alert("Transaction confirmed!");
  } else if (event.data.status === "rejected") {
    alert("Transaction rejected.");
  }
});