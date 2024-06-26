
import facebookLogo from "../images/facebook-svgrepo-com (1).svg";
import instagramLogo from "../images/instagram-svgrepo-com.svg";

export default function Footer () {

  return (
    <footer>
      <div className="social-icons">
        <a href="https://facebook.com">
          <img src={facebookLogo} alt="Facebook" />
        </a>
        <a href="https://twitter.com">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="Twitter" />
        </a>
        <a href="https://instagram.com">
          <img src={instagramLogo} alt="Instagram" />
        </a>
      </div>
      <p>The Dog Adoption Center | © 2024 All Rights Reserved</p>
    </footer>
  )
}