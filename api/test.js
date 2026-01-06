export const config = {
  runtime: "nodejs"
};

import axios from "axios";

export default async function handler(req, res) {
  try {
    const r = await axios.get("https://caspit.valu.co.il/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
      },
      timeout: 10000
    });

    res.status(200).json({
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
