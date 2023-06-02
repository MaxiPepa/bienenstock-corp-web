import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="page-not-found">
      <h2>404</h2>
      <h3>Oops! Looks like you followed a bad link.</h3>
      <Link to={-1}>Go back!</Link>
    </div>
  );
};

export default NotFound;
