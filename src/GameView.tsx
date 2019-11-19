import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, SS } from './store';
import banner from './styles/banner.scss';
import region from './styles/region.scss';
import { Transition } from './Transition';

export interface GameViewProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export function GameView({ iframeRef }: GameViewProps) {
  const dispatch = useDispatch();
  const bringGameFront = useSelector((state: SS) => state.mode.bringGameFront);
  const lv = useSelector((state: SS) => state.sandbox.localVersion);
  const rv = useSelector((state: SS) => state.sandbox.runningVersion);
  const version = useSelector((state: SS) => state.sandbox.version);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    const blur = () => {
      if (window.document.activeElement === iframeRef.current) {
        // focused on iframe
        dispatch(actions.bringGameFront(true));
        dispatch(actions.runSanbox());
        setFocused(true);
      }
    };
    const focus = () => {
      setFocused(false);
    };
    window.addEventListener('blur', blur, { passive: true });
    window.addEventListener('focus', focus, { passive: true });
    return () => {
      window.removeEventListener('blur', blur);
      window.removeEventListener('focus', focus);
    };
  }, []);

  return (
    <div
      className={classNames(region.output, bringGameFront && region.bringFront)}
    >
      <Transition
        in={!focused}
        className={banner.wrapper}
        exiting={banner.exiting}
      >
        {version <= rv ? (
          <div className={banner.black}>
            <img src={require('./resources/paperPlane.svg')} alt="✈︎" />
            <span>{'This is the latest version'}</span>
          </div>
        ) : version === lv ? (
          <div className={banner.black}>
            <img src={require('./resources/paperPlane.svg')} alt="✈︎" />
            <span>{'New version by you'}</span>
          </div>
        ) : (
          <div style={{ backgroundColor: '#F1C40F' }}>
            <img src={require('./resources/paperPlane.svg')} alt="✈︎" />
            <span>{'New version by Teramoto'}</span>
          </div>
        )}
      </Transition>
      <iframe
        src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
        frameBorder="0"
        ref={iframeRef}
      ></iframe>
    </div>
  );
}
