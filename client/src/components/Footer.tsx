
import "../styles/footer.css";
import React from "react";

import { SVGInstagram, SVGGithub, SVGLinkedin } from "./SVGIcons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        {/* <div className="contribute">
          <h4>Contribute here</h4>
          
          <a
            href="https://github.com/shlok-007/GoTo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVGGithub />
          </a>

        </div> */}
        <div className="developers">
          <h4>Developer</h4>

          <div className="developer">
            <div className="dev-detail">
              <div className="dev-name">Parvathy J Nair</div>
              <div className="dev-role">Backend • Frontend</div>
            </div>
            <div className="dev-social">
              <a
                href="https://github.com/parvathyjnair"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGGithub width="25" height="25"/>
              </a>
              <a
                href="https://www.linkedin.com/in/parvathy-nair-6ba368224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGLinkedin  width="25" height="25"/>
              </a>
              {/* <a
                href="https://www.instagram.com/shlok_3.14"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGInstagram width="25" height="25" />
              </a> */}
              
            </div>
          </div>

          {/* <div className="developer">
            <div className="dev-detail">
              <div className="dev-name">Shahaji Deshmukh</div>
              <div className="dev-role">Frontend</div>
            </div>
            <div className="dev-social">
              <a
                href="https://github.com/Algo-O3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGGithub width="25" height="25"/>
              </a>
              <a
                href="https://www.linkedin.com/in/sd-541u"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGLinkedin  width="25" height="25"/>
              </a>
              <a
                href="https://instagram.com/_shahaji_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGInstagram width="25" height="25" />
              </a>
              
            </div>
          </div> */}

          {/* <div className="developer">
            <div className="dev-detail">
              <div className="dev-name">Varsha Swaraj</div>
              <div className="dev-role">Frontend</div>
            </div>
            <div className="dev-social">
              <a
                href="https://github.com/callmeVAMP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGGithub width="25" height="25"/>
              </a>
              <a
                href="https://www.linkedin.com/in/varsha-swaraj-843724274"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGLinkedin  width="25" height="25"/>
              </a>
              <a
                href="https://www.instagram.com/callmevam___p"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGInstagram width="25" height="25" />
              </a>
              
            </div>
          </div> */}

        </div>
      </div>
      {/* <div className="powered-by">
        Powered by the PJN
      </div> */}
    </footer>
  );
};

export default Footer;