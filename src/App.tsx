import { Component, Show } from "solid-js";

import { useNetworkStatus } from "./hook/useNetworkStatus";

import { Form } from "./component/Form";

import { Hero } from "./component/Hero";
import { OnlineStatus } from "./component/OnlineStatus";
import { Addresses } from "./component/Addresses";
import { addresses, derivationPaths, form } from "./store";

const App: Component = () => {
  const isOnline = useNetworkStatus();

  return (
    <div class="flex flex-col items-center">
      <OnlineStatus isOnline={isOnline()} />
      <div class="container p-6 md:p-16 max-w-5xl">
        <Hero class="mx-6" />
        <Form class="mb-16" />
        <Show when={!!form.phrase}>
          <Addresses addresses={addresses} paths={derivationPaths} />
        </Show>
      </div>
    </div>
  );
};

export default App;
