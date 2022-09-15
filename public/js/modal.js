const wrapperCircles = document.getElementById('circles');
const circles = document.querySelectorAll('.circle');
const buttons = document.querySelectorAll('.btn');

wrapperCircles.addEventListener('click', openWindow);

async function openWindow(e) {
  let id = e.target.getAttribute('data-id');

  if (!id) {
    return;
  }

  const url = `https://sibedge.atlassian.net/wiki/spaces/DD/pages/${id}`;

  window.open(url, '_blank');
}

tippy([...circles, ...buttons], {
  content: 'Loading...',
  onShow(instance) {
    const id = instance.reference.getAttribute('data-id');

    if (!id) {
      instance.setContent('Не указан data-id');
      return;
    }

    fetch(`/confluenceTitle/${id}`)
      .then((response) => response.json())
      .then(({ data }) => {
        instance.setContent(data);
      })
      .catch((error) => {
        instance.setContent(`Request failed. ${error}`);
      });
  },
});
