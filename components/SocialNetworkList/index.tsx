import s from './SocialNetworkList.module.scss';
import { socialNetworks } from '../../resources/networks';

const SocialNetworkList = () => {
  return (
    <ul className={s.list}>
      {socialNetworks.map((network, index) =>
        <li className={s.item} key={index}>
          <a
            className={s.link}
            href={network.link}
            target="_blank"
            rel="noreferrer"
            title={network.title}
          >
            <img src={`/images/networks/${network.file}`} alt={network.title} />
          </a>
        </li>
      )}
    </ul>
  );
};

export default SocialNetworkList;
