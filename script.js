const word = [
  "Happy", "Been Together", "05.06.2022",
  "We met on a sunny day", "Love You",
  "i love you so much", "763 days"
];
const numwords = 50;

for (let i = 0; i < numwords; i++) {
  const span = document.createElement("span");
  span.classList.add("word");
  span.innerText = word[Math.floor(Math.random() * word.length)];

  span.style.left = `${Math.random() * 100}vw`;
  span.style.top = `${100 + Math.random() * 20}vh`;  // bay từ dưới lên

  // Thời gian bay
  span.style.animationDuration = `${6 + Math.random() * 4}s`;

  // Font và độ mờ
  span.style.fontSize = `${16 + Math.random() * 14}px`;
  const opacity = 0.5 + Math.random() * 0.5;
  span.style.setProperty('--opacity', opacity.toFixed(2));

  document.body.appendChild(span);
}


//cánh hoa rơi
window.addEventListener('load', () => {
  const maxPetals = 20;       // Số cánh hoa tối đa bay trên màn hình cùng lúc
  const petals = [];

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    petal.baseX = Math.random() * window.innerWidth;
    petal.style.left = petal.baseX + 'px';

    petal.style.top = window.innerHeight + Math.random() * 100 + 'px';

    const size = 15 + Math.random() * 15;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    petal.speedX = -(5 + Math.random() * 150);
    petal.speedY = -(150 + Math.random() * 100);

    petal.rotation = Math.random() * 360;
    petal.rotationSpeed = (Math.random() - 0.5) * 20;

    petal.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);

    document.body.appendChild(petal);
    return petal;
  }

  function addPetal() {
    if (petals.length < maxPetals) {
      petals.push(createPetal());
    }
  }

  let lastTime = null;

  function update(time) {
    if (!lastTime) lastTime = time;
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    // Cập nhật vị trí và xoay từng cánh hoa
    for (let i = petals.length - 1; i >= 0; i--) {
      const petal = petals[i];
      let left = parseFloat(petal.style.left) || 0;
      let top = parseFloat(petal.style.top) || window.innerHeight;

      left += petal.speedX * delta;
      top += petal.speedY * delta;

      petal.style.left = left + 'px';
      petal.style.top = top + 'px';

      petal.rotation += petal.rotationSpeed * delta;
      petal.style.transform = `rotate(${petal.rotation}deg)`;

      // Nếu bay ra ngoài màn hình thì xóa cánh hoa đó
      if (top < -50 || left < -50) {
        petal.remove();
        petals.splice(i, 1);
      }
    }

    // Liên tục thêm cánh hoa mới để duy trì số lượng
    addPetal();

    requestAnimationFrame(update);
  }

  // Khởi tạo ban đầu 5 cánh hoa để không quá trống trải lúc đầu
  for (let i = 0; i < 5; i++) {
    petals.push(createPetal());
  }

  requestAnimationFrame(update);
});