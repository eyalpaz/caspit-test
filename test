import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import tough from "tough-cookie";

export default async function handler(req, res) {
  const jar = new tough.CookieJar();
  const client = wrapper(
    axios.create({
      baseURL: "https://caspit.valu.co.il",
      jar,
      withCredentials: true,
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
      }
    })
  );

  try {
    const r = await client.post("/bo/token_login", {
      username: process.env.CASPIT_USER,
      password: process.env.CASPIT_PASS,
      code: ""
    });

    res.json({
      ok: true,
      status: r.status
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      status: err?.response?.status,
      message: err.message
    });
  }
}
