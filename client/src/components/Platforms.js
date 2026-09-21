const ICONS = [
  { key: 'xbox', label: 'Xbox', src: require('../assets/Xbox.png') },
  { key: 'PS4', label: 'PS4', src: require('../assets/PS4.png') },
  { key: 'nSwitch', label: 'Switch', src: require('../assets/Switch.png') },
  { key: 'PC', label: 'PC', src: require('../assets/Steam.png') },
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
