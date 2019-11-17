import * as React from 'react';
import { Provider } from 'react-redux';
import { Root, RootProps } from './Root';
import { createGamebookStore } from './store';

export interface GamebookProps extends RootProps {
  store?: ReturnType<typeof createGamebookStore>;
}

export function Gamebook({ store, ...props }: GamebookProps) {
  const [storeValue] = React.useState(store || createGamebookStore);

  return (
    <Provider store={storeValue}>
      <Root {...props} />
    </Provider>
  );
}
