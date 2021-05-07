CMS.registerEditorComponent({
  id: 'figure',
  label: 'Figure',
  fields: [
    { name: 'src', label: 'Image', widget: 'string' },
    { name: 'alt', label: 'Image alternative text', widget: 'string' },
    { name: 'caption', label: 'Caption text', widget: 'string' },
    { name: 'credit', label: 'Image credit', widget: 'string' }
  ],
})
