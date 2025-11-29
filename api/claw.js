import multiparty from 'multiparty';
import FormData from 'form-data';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Parse gagal' });
    const cid = fields.cid[0];
    const type = fields.type[0];
    const cap = fields.cap[0];
    const f = files.f[0];
    const tok = process.env.RVCROW_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${tok}/send${type === 'photo' ? 'Photo' : 'Video'}`;
    const fd = new FormData();
    fd.append(type, fs.createReadStream(f.path), f.originalFilename);
    fd.append('chat_id', cid);
    fd.append('caption', cap);
    try {
      await fetch(url, { method: 'POST', body: fd });
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
};
