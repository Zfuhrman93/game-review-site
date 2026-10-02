import xboxIcon from '../assets/Xbox.png';
import ps4Icon from '../assets/PS4.png';
import switchIcon from '../assets/Switch.png';
import steamIcon from '../assets/Steam.png';

const ICONS = [
  { key: 'xbox', label: 'Xbox', src: xboxIcon },
  { key: 'PS4', label: 'PS4', src: ps4Icon },
  { key: 'nSwitch', label: 'Switch', src: switchIcon },
  { key: 'PC', label: 'PC', src: steamIcon },
];

const Platforms = ({ game, large }) => (
  <div className="platforms">
    {ICONS.map(({ key, label, src }) =>
      game && game[key]
        ? <img key={key} className={large ? 'platform-icon lg' : 'platform-icon'} src={src} alt={label} title={label} />
        : null
    )}
  </div>
);

export default Platforms;
