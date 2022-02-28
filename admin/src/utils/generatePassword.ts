const generatePassword = () => {
  const buf = new Uint8Array(6);
  window.crypto.getRandomValues(buf);

  return btoa(String.fromCharCode.apply(null, buf));
};

export default generatePassword;
