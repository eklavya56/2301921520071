async function Log(stack, level, package_name, message) {
  const response = await fetch("http://4.224.186.213/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpMjMwMThAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU0NTAyLCJpYXQiOjE3ODI0NTM2MDIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxOWU0NGFhMi0zMDJhLTRkMGQtOTJjZC1iZDU5ODc4MjFlNzUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJla2xhdnlhIHZlcm1hIiwic3ViIjoiNWJiNTU4NDMtNDgyMC00MjU2LTkyNTMtNmEzMDI1OGU5ZTI3In0sImVtYWlsIjoiY3NhaTIzMDE4QGdsYml0bS5hYy5pbiIsIm5hbWUiOiJla2xhdnlhIHZlcm1hIiwicm9sbE5vIjoiMjMwMTkyMTUyMDA3MSIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6IjViYjU1ODQzLTQ4MjAtNDI1Ni05MjUzLTZhMzAyNThlOWUyNyIsImNsaWVudFNlY3JldCI6InNLalNUV3Jxd0FkSFp5bVkifQ.aPxf97tc-6K4ZJMXPeVQm8ct7n5cPZOtjsZInDHuSrU"
    },
    body: JSON.stringify({
      stack: stack,
      level: level,
      package: package_name,
      message: message
    })
  });

  const data = await response.json();
  return data;
}

module.exports = { Log };