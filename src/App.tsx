import { Component, Show } from "solid-js";

import { useNetworkStatus } from "./hook/useNetworkStatus";

import { Form } from "./component/Form";

import { Hero } from "./component/Hero";
import { OnlineStatus } from "./component/OnlineStatus";
import { Addresses } from "./component/Addresses";
import { addresses, addressesLoading, derivationPaths, form } from "./store";
import { Footer } from "./component/Footer";

const App: Component = () => {
  const isOnline = useNetworkStatus();

  return (
    <div class="flex flex-col items-center bg-gray-50">
      <OnlineStatus isOnline={isOnline()} />
      <div class="container p-6 md:p-16 max-w-5xl">
        <Hero class="mx-6" />
        <Form class="mb-10" form={form} />
        <Addresses addresses={addresses} paths={derivationPaths} loading={addressesLoading()} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
