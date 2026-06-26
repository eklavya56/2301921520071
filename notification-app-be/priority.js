const { Log } = require('../logging-middleware');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpMjMwMThAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU3ODk5LCJpYXQiOjE3ODI0NTY5OTksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwNWVmYjQ4NC0wZWNmLTRhMzMtYTZiYS04YTUzMTU4Y2JjODMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJla2xhdnlhIHZlcm1hIiwic3ViIjoiNWJiNTU4NDMtNDgyMC00MjU2LTkyNTMtNmEzMDI1OGU5ZTI3In0sImVtYWlsIjoiY3NhaTIzMDE4QGdsYml0bS5hYy5pbiIsIm5hbWUiOiJla2xhdnlhIHZlcm1hIiwicm9sbE5vIjoiMjMwMTkyMTUyMDA3MSIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6IjViYjU1ODQzLTQ4MjAtNDI1Ni05MjUzLTZhMzAyNThlOWUyNyIsImNsaWVudFNlY3JldCI6InNLalNUV3Jxd0FkSFp5bVkifQ.fBoHWuIuHuF4q8oxiV809J-WD9BOVcqjCjq575mXx2w";

const WEIGHTS = { Placement: 3, Result: 2, Event: 1 };

async function getTopNNotifications(n) {
  try {
    Log("backend", "info", "service", `Fetching top ${n} priority notifications`);

    const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      }
    });

    const data = await response.json();
    const notifications = data.notifications;

    Log("backend", "info", "service", `Total notifications fetched: ${notifications.length}`);

    const sorted = notifications.sort((a, b) => {
      const weightDiff = (WEIGHTS[b.Type] || 0) - (WEIGHTS[a.Type] || 0);
      if (weightDiff !== 0) return weightDiff;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top = sorted.slice(0, n);
    Log("backend", "info", "service", `Returning top ${n} priority notifications`);
    return top;

  } catch (err) {
    Log("backend", "error", "service", `Failed: ${err.message}`);
    console.error(err);
  }
}

getTopNNotifications(10).then(result => {
  console.log("Top 10 Priority Notifications:");
  console.log(JSON.stringify(result, null, 2));
});