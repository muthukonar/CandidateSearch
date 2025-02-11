

import {Link} from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      {/* <div className="container-fluid"> */}
        {/* Logo or brand link */}
        {/* <Link className="navbar-brand" to="/">
          Home
        </Link>
         */}
        {/* Toggler for mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links on the left */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/SavedCandidates">Potential Candidates</Link>
            </li>
          </ul>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Nav;
