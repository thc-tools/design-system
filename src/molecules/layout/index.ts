// @index(['./*.{ts,tsx}', './*/index.{ts,tsx}'], f => `export * from "${f.path.replace(/\/index$/, '')}";`)
export * from "./Header";
export * from "./Layout";
export * from "./PageContent";
export * from "./PageElement";
// @endindex
