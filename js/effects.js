const IMG_SCALE_STEP = 25;
const IMG_SCALE_MAX = 100;
const IMG_SCALE_MIN = 25;

const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'grayscale',
    unit: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'sepia',
    unit: ''
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    style: 'invert',
    unit: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px'
  },
  heat: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'brightness',
    unit: ''
  },
};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderValue = sliderContainer.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const changeScaleSmaller = () => {
  if (parseInt(scaleControlValue.value, 10) > IMG_SCALE_MIN) {
    const imgPreviewStep = (parseInt(scaleControlValue.value, 10) - IMG_SCALE_STEP) / 100;
    imgPreview.style.transform = `scale(${imgPreviewStep})`;
    scaleControlValue.value = `${imgPreviewStep * 100}%`;
  }
};

const changeScaleBigger = () => {
  if (parseInt(scaleControlValue.value, 10) < IMG_SCALE_MAX) {
    const imgPreviewStep = (parseInt(scaleControlValue.value, 10) + IMG_SCALE_STEP) / 100;
    imgPreview.style.transform = `scale(${imgPreviewStep})`;
    scaleControlValue.value = `${imgPreviewStep * 100}%`;
  }
};

scaleControlSmaller.addEventListener('click', changeScaleSmaller);
scaleControlBigger.addEventListener('click', changeScaleBigger);

sliderValue.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

const changeEffect = ({min, max, step, style, unit}) => {
  sliderElement.noUiSlider.off('update');
  sliderContainer.style.display = 'block';
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `${style}(${sliderValue.value}${unit})`;
  });
};

effectsList.addEventListener('change', (evt) => {
  const selectedEffect = evt.target.value;
  if (selectedEffect === 'none') {
    sliderElement.noUiSlider.off('update');
    sliderContainer.style.display = 'none';
    imgPreview.style.removeProperty('filter');
  } else {
    changeEffect(EFFECTS[selectedEffect]);
  }
});
