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

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview').querySelector('img');

const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const sliderValueElement = sliderContainerElement.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');

const changeScaleSmaller = () => {
  if (parseInt(scaleControlValueElement.value, 10) > IMG_SCALE_MIN) {
    const imgPreviewStep = (parseInt(scaleControlValueElement.value, 10) - IMG_SCALE_STEP) / 100;
    imgPreviewElement.style.transform = `scale(${imgPreviewStep})`;
    scaleControlValueElement.value = `${imgPreviewStep * 100}%`;
  }
};

const onChangeScaleSmaller = () => changeScaleSmaller();

const changeScaleBigger = () => {
  if (parseInt(scaleControlValueElement.value, 10) < IMG_SCALE_MAX) {
    const imgPreviewStep = (parseInt(scaleControlValueElement.value, 10) + IMG_SCALE_STEP) / 100;
    imgPreviewElement.style.transform = `scale(${imgPreviewStep})`;
    scaleControlValueElement.value = `${imgPreviewStep * 100}%`;
  }
};

const onChangeScaleBigger = () => changeScaleBigger();

const resetScale = () => {
  imgPreviewElement.style.transform = 'scale(1)';
  scaleControlValueElement.value = '100%';
};

scaleControlSmallerElement.addEventListener('click', onChangeScaleSmaller);
scaleControlBiggerElement.addEventListener('click', onChangeScaleBigger);

sliderValueElement.value = 100;

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
  sliderContainerElement.style.display = 'block';
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValueElement.value = sliderElement.noUiSlider.get();
    imgPreviewElement.style.filter = `${style}(${sliderValueElement.value}${unit})`;
  });
};

const removeEffects = () => {
  sliderElement.noUiSlider.off('update');
  sliderContainerElement.style.display = 'none';
  imgPreviewElement.style.removeProperty('filter');
};

effectsListElement.addEventListener('change', (evt) => {
  const selectedEffect = evt.target.value;
  if (selectedEffect === 'none') {
    removeEffects();
  } else {
    changeEffect(EFFECTS[selectedEffect]);
  }
});

export {removeEffects, resetScale};
