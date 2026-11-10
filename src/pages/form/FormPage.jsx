import "./form.scss";
import Portrait from "../../assets/IMG_5153.jpeg";
import LinkedInIcon from "../../assets/linkedin";
import InstagramIcon from "../../assets/instagram";
import GithubIcon from "../../assets/github";
import VerifiedMark from "../../assets/verifiedmark";
import LinkIcon from "../../assets/linkIcon";
import Links from "../../links.json";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ShareLink from "../../assets/share";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/erbollldev/",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/e.nrkvv/",
    Icon: InstagramIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/fullmetalldev",
    Icon: GithubIcon,
  },
];

const FormPage = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [copied, setCopied] = useState(false);

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this page",
          url: window.location.href,
        });
      } catch {
        // User closed the share sheet
      }
    } else {
      // Fallback for browsers without Web Share API
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            onClick={sharePage}
            className="formPage__form-share"
          >
            <ShareLink />
          </button>
          <span
            className={`formPage__form-toast ${copied ? "is-visible" : ""}`}
            role="status"
          >
            Link copied
          </span>

          <div className="formPage__form-hero">
            <img
              className="formPage__form-image"
              src={Portrait}
              alt="Erbol Nurekov"
            />
            <div
              style={{
                opacity: Math.min(scrollY / 400, 1),
              }}
              className="formPage__form-imageBlur"
            />
          </div>

          <div className="formPage__form-content">
            <div className="formPage__form-content-name">
              <h1 className="Skranji">Erbol Nurekov</h1>
              <VerifiedMark />
            </div>
            <p className="formPage__form-content-role">Software Engineer III</p>

            <div className="formPage__form-content-socials">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  aria-label={`Open ${label} profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={href}
                >
                  <Icon />
                </a>
              ))}
            </div>

            <ul className="formPage__form-content-list">
              {Links.map((link, idx) => (
                <li key={idx} style={{ "--i": idx }}>
                  <a target="_blank" rel="noopener noreferrer" href={link.url}>
                    <span className="link-icon">
                      {link.inDevelopment ? <Loader /> : <LinkIcon />}
                    </span>
                    <span className="link-title">{link.title}</span>
                    {link.inDevelopment ? (
                      <span className="link-badge">In progress</span>
                    ) : (
                      <span className="link-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <footer className="formPage__form-content-footer">
              © {new Date().getFullYear()} Erbol Nurekov
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormPage;
