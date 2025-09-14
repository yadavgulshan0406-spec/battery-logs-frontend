// Replace with your deployed Render backend URL
const BACKEND_URL = "https://battery-logs-backend.onrender.com";

async function fetchBatteryData() {
  const buid = document.getElementById("buidInput").value;
  const resultDiv = document.getElementById("result");

  if (!buid) {
    resultDiv.innerHTML = "<p style='color:red;'>⚠️ Please enter a BUID</p>";
    return;
  }

  resultDiv.innerHTML = "<p>⏳ Fetching data...</p>";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buid })
    });

    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">⚠️ Error: ${err.message}</p>`;
  }
}
