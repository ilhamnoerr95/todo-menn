import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  console.log(req.query)
//   res.end(`Post: ${slug.join(', ')}`)
// res.end(slug)
}