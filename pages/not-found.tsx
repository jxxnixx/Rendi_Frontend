export default function handler({ req, res }: any) {
  res.status(404).json({ message: "Not Found" });
}
