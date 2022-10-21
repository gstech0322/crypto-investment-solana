import './Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
// Constants
const HANDLE = 'tapabratadey';
const TWITTER_LINK = `https://twitter.com/${HANDLE}`;
const GITHUB_LINK = `https://github.com/${HANDLE}`;

const FooterComponent: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <h5 className="footerText">{`built by @${HANDLE}`}</h5>
        <a
          href={TWITTER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ paddingRight: '10px' }}
        >
          <TwitterIcon sx={{ color: '#1DA1F2' }} />
        </a>
        <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
          <GitHubIcon sx={{ color: 'white' }} />
        </a>
      </div>
    </footer>
  );
};
export default FooterComponent;
