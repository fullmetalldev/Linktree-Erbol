import "./form.scss";
import Portrait from "../../assets/erbol.png";
import LinkedInIcon from "../../assets/linkedin";
import InstagramIcon from "../../assets/instagram";
import GithubIcon from "../../assets/github";
import VerifiedMark from "../../assets/verifiedmark";
import LinkIcon from "../../assets/linkIcon";
import Links from "../../links.json";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ShareLink from "../../assets/share";

const FormPage = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "Check out this page",
        url: window.location.href,
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="formPage">
      <div className="container">
        <div className="formPage__form">
          <button
            aria-label="Share the page"
            onClick={() => sharePage()}
            className="fixed"
          >
            <ShareLink />
          </button>

          <img
            className="formPage__form-image"
            src={Portrait}
            alt="Form Image"
          />
          <div
            style={{
              opacity: `${scrollY / 4}%`,
            }}
            className="formPage__form-imageBlur"
          />
          <div className="formPage__form-content">
            <div className="formPage__form-content-transition" />
            <div className="formPage__form-content-name">
              <h2 className="Skranji">Erbol Nurekov</h2>
              <VerifiedMark />
            </div>
            <span>Software Engineer III</span>
            <div className="formPage__form-content-socials">
              <a
                aria-label="Open Linkedin Profile"
                target="_blank"
                href="https://www.linkedin.com/in/erbollldev/"
              >
                <LinkedInIcon />
              </a>
              <a
                aria-label="Open Instagram Profile"
                target="_blank"
                href="https://www.instagram.com/e.nrkvv/"
              >
                <InstagramIcon />
              </a>
              <a
                aria-label="Open Github Profile"
                target="_blank"
                href="https://github.com/fullmetalldev"
              >
                <GithubIcon />
              </a>
            </div>

            <ul className="formPage__form-content-list">
              {Links.map((link, idx) => (
                <a key={idx} target="_blank" href={link.url}>
                  {link.inDevelopment ? (
                    <span>
                      <Loader /> 
                    </span>
                  ) : (
                    <span>
                      <LinkIcon /> 
                    </span>
                  )}
                   {link.title}
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormPage;
