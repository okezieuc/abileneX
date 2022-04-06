export default function handler(req, res) {
    res.send(process.env.zoom_verification_code)
}