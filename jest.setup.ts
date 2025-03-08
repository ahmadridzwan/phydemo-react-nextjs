import '@testing-library/jest-dom';

window.HTMLVideoElement.prototype.play = () => Promise.resolve();
