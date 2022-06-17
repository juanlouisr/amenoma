declare global {
  interface String {
    textClean(): string;
    removeScript(): string;
  }
}
// currently not working
String.prototype.textClean = (): string => {
  return String(this)
    .replace(/\\.([A-z]|\\+)/g, "$1")
    .replace(/\\+([A-z])/g, "$1");
};
// currently not working
String.prototype.removeScript = (): string => {
  return String(this).replace(
    /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>/g,
    ""
  );
};
export {};
