// Replace with your deployed Render backend URL
const BACKEND_URL = "https://battery-logs-backend.onrender.com";

async function fetchBatteryData() {
  const buid = document.getElementById("buidInput").value.trim();
  const resultDiv = document.getElementById("result");

  // Validate input
  if (!buid) {
    resultDiv.innerHTML = "<p style='color:red;'>⚠️ Please enter a BUID</p>";
    return;
  }

  resultDiv.innerHTML = "<p>⏳ Fetching data...</p>";

  try {
    const response = await fetch(`${BACKEND_URL}/battery-data`, { // Make sure the endpoint matches your backend route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buid })
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      resultDiv.innerHTML = `<p style="color:orange;">ℹ️ BUID not found in Battery Master</p>`;
      return;
    }

    // Display only the latest 2 responses if your backend sends multiple entries
    const latestData = Array.isArray(data) ? data.slice(-2).reverse() : [data];

    resultDiv.innerHTML = latestData.map(d => `<pre>${JSON.stringify(d, null, 2)}</pre>`).join("");
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">⚠️ Error: ${err.message}</p>`;
  }
}
