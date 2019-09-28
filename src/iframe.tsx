window.addEventListener('message', event => {
  if (typeof event.data !== 'string') return;
  console.log(event.data);
  eval(event.data);
});
