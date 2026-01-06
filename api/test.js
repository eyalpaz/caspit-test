export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  try {
    // 1️⃣ Preflight GET (לקבל cookies מ-Cloudflare)
    const pre = await fetch("https://caspit.valu.co.il/login", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    });

    const cookies = pre.headers.get("set-cookie");

    // 2️⃣ Login POST עם cookies
    const login = await fetch("https://caspit.valu.co.il/bo/token_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json, text/plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Origin": "https://caspit.valu.co.il",
        "Referer": "https://caspit.valu.co.il/login",
        "Cookie": cookies || ""
      },
      body: JSON.stringify({
        username: process.env.CASPIT_USER,
        password: process.env.CASPIT_PASS,
        code: ""
      })
    });

    const text = await login.text();

    res.status(200).json({
      ok: login.ok,
      status: login.status,
      cookieSent: !!cookies,
      preview: text.slice(0, 300)
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.message
    });
  }
}
