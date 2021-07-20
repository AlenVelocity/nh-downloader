import type { NextApiRequest, NextApiResponse } from 'next'
import { Doujin } from 'nhentai-pdf/dist'

const DoujinApi = async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof req.query.code !== 'string') return void res.send(false)
    const doujin = new Doujin(req.query.code)
    if (!await doujin.validate()) return void res.json(false)
    await doujin.fetch()
    if (req.query.method !== 'download') return void res.json(doujin.info)
    const pdf = await doujin.pdf()
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${doujin.info.title}.pdf"`);
    res.setHeader('Content-Length', pdf.length)
    res.setHeader('Cache-Control', 'no-cache, must-revalidate')
    res.setHeader('Last-Modified', new Date().toUTCString())
    res.setHeader('ETag', `"${doujin.info.title}"`);
    res.status(200)
    res.send(pdf)
}

export default DoujinApi