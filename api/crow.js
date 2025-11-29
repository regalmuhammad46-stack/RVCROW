export default async (req, res) => {
  const { cid, t } = req.body;
  const tok = process.env.RVCROW_BOT_TOKEN;
  try {
    await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: cid, text: t, parse_mode: 'HTML' })
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
