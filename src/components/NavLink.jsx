import { Link } from "react-router-dom";
// Router link for "/..." paths, plain anchor for in-page "#..." targets.
export default function L({ to, ...p }) {
  return to.startsWith("/") ? <Link to={to} {...p} /> : <a href={to} {...p} />;
}
