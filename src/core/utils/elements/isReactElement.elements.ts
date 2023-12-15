export function isReactElement(node: React.ReactNode): node is React.ReactElement {
    return !!node && Object.prototype.hasOwnProperty.call(node, "type");
}
