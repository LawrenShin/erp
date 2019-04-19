export const generalFormSubmit = (info, step = 1) => ({
  type: 'GENERAL_INFO',
  info,
  step
});

export const contactFormSubmit = (info, step = 1) => ({
  type: 'CONTACT_INFO',
  info,
  step
});

export const optionsFormSubmit = (info, step = 1) => ({
  type: 'OPTIONS_INFO',
  info,
  step
});

export const bankFormSubmit = (info, step = 1) => ({
  type: 'BANK_INFO',
  info,
  step
});

export const stepBack = () => ({
  type: 'STEP_BACK'
})
