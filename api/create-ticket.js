export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Solo POST");

  const { titolo, descrizione, utenti } = req.body;

  const results = [];

  for (const email of utenti) {
    const azureRes = await fetch(
      `https://dev.azure.com/eurosystemtest/BI%20Lab/_apis/wit/workitems/$Task?api-version=7.1-preview.3`,
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Authorization': `Basic ${Buffer.from(`:${process.env.AZURE_PAT}`).toString('base64')}`
        },
        body: JSON.stringify([
          { op: "add", path: "/fields/System.Title", value: titolo },
          { op: "add", path: "/fields/System.Description", value: descrizione },
          { op: "add", path: "/fields/System.AssignedTo", value: email }
        ])
      }
    );

    const json = await azureRes.json();
    resultss.push(json);
  }
