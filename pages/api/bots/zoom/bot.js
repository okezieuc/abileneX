export default function handler(req, res) {
    console.log(req.body)
    res.send('Chat received')
}