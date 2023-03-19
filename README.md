# XChain Address Derivation

> Utility to derive addresses from a mnemonic phrase ([BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)) or keystore ([XChain](https://github.com/xchainjs/xchainjs-lib)). Very similar to Iancoleman's [Mnemonic Code Converter](https://iancoleman.io/bip39/), but more simplified and for chains supported by [THORChain](https://thorchain.org) and [Maya](https://www.mayaprotocol.com) only. Derivation of addresses built with [XChainjs](https://github.com/xchainjs/xchainjs-lib).


## Live

:eyes: https://veado.github.io/xchain-address-derivation/

## Preview

![Preview](./preview.gif)

*Just in case:* Phrase in preview ^ was taken from fantastic book `Mastering Bitcoin` - [Chapter 5 - Mnemonic Code Words (BIP-39)](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc#mnemonic-code-words-bip-39)


## Local development

```bash
npm i
npm run dev
```
Open http://localhost:3000/xchain-address-derivation/

## Production build

```bash
npm run build
```

## Prepare deployment

```bash
# Build sources for deployment into 'dist` folder
npm run build
# check deployment locally by opening http://localhost:4173/xchain-address-derivation/
npm run preview
```

## Built with

- [Solid](https://www.solidjs.com)
- [solid-form-handler](https://solid-form-handler.com/)
- [xchain-*](https://github.com/xchainjs/xchainjs-lib/)
- [tailwindcss](https://tailwindcss.com)
- [Sail UI](https://github.com/sailui/ui)
- [Vite](https://vitejs.dev/)


## Licence

[MIT](./LICENSE)
