function explode(selector, options) {
  insertCss();

  const node = document.querySelector(selector);
  const container = node.cloneNode();
  container.style.perspective = '1000px';
  container.style.background = 'none';

  const rect = node.getBoundingClientRect();
  container.addEventListener('mousemove', (e) => {
    let rotateY = -90 / rect.width * e.offsetX + 45;
    let rotateX = 90 / rect.height * e.offsetY - 45;
    node.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(0.8)`;
  });

  node.style.transition = 'none';
  container.appendChild(node);
  document.body.appendChild(container);
  explodeElement(node, options);
}

function explodeElement(node, options) {
  node.classList.add('explode-box');
  explodeElements([...node.children], options);
}

function explodeElements(nodes, options) {
  nodes.forEach(node => explodeElement(node, options));
}

function insertCss() {
  const style = document.createElement('style');
  style.innerHTML = `
    .explode-box {
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(20px) scale(0.8);
      transition: transform .5s;
      background: #fff;
      pointer-events: none;
    }
    .explode-box::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transform-style: preserve-3d;
      transform: translateZ(-19px);
      background: inherit;
      filter: opacity(0.3) brightness(0.3) blur(5px);
    }
  `;
  document.head.appendChild(style);
}