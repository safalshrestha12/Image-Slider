class ImageSlider {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('[data-slider-track]');
    this.slides = [...root.querySelectorAll('.slide')];
    this.previousButton = root.querySelector('[data-slider-prev]');
    this.nextButton = root.querySelector('[data-slider-next]');
    this.dotsContainer = root.querySelector('[data-slider-dots]');
    this.status = root.querySelector('[data-slider-status]');
    this.activeIndex = 0;

    this.createDots();
    this.bindEvents();
    this.render();
  }

  createDots() {
    this.dots = this.slides.map((slide, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.type = 'button';
      dot.role = 'tab';
      dot.ariaLabel = `Show slide ${index + 1}`;
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.append(dot);
      return dot;
    });
  }

  bindEvents() {
    this.previousButton.addEventListener('click', () => this.goTo(this.activeIndex - 1));
    this.nextButton.addEventListener('click', () => this.goTo(this.activeIndex + 1));
  }

  getWrappedIndex(index) {
    return (index + this.slides.length) % this.slides.length;
  }

  goTo(index) {
    this.activeIndex = this.getWrappedIndex(index);
    this.render();
  }

  render() {
    this.track.style.transform = `translateX(-${this.activeIndex * 100}%)`;
    this.dots.forEach((dot, index) => {
      const isActive = index === this.activeIndex;
      dot.ariaSelected = String(isActive);
      dot.tabIndex = isActive ? 0 : -1;
    });
    this.status.textContent = `Slide ${this.activeIndex + 1} of ${this.slides.length}`;
  }
}

document.querySelectorAll('[data-slider]').forEach((slider) => new ImageSlider(slider));
