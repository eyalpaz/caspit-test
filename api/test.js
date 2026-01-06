export default async function handler(req, res) {
  try {
    const response = await fetch("https://caspit.valu.co.il/bo/token_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: process.env.CASPIT_USER,
        password: process.env.CASPIT_PASS,
        code: ""
      })
    });

    const text = await response.text();

    res.status(200).json({
      ok: response.ok,
      status: response.status,
      body: text.slice(0, 500) // שלא יפיל אם יש הרבה HTML
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.message
    });
  }
}
