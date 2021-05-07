CMS.registerEditorComponent({
  label: 'Figure',
  id: 'figure',
  fields: [
    { name: 'src', label: 'Image', widget: 'image', media_library: { allow_multiple: false } },
    { name: 'alt', label: 'Image alternative text', widget: 'string' },
    { name: 'caption', label: 'Caption text' },
    { name: 'credit', label: 'Image credit' }
  ],
  // TODO: this regex should/could be more forgiving in parameter order and/or
  // missing parameters.
  pattern: /{{< img src="(.*)" alt="(.*)" caption="(.*)" credit="(.*)" >}}/,
  fromBlock:(match) => {
    return match && {
      src: match[1],
      alt: match[2],
      caption: match[3],
      credit: match[4],
    }
  },
  toBlock:({ src, alt, caption, credit }) => {
    return `{{< img src="${src}" alt="${alt}" caption="${caption}" credit="${credit}" >}}`;
  },
  toPreview: function({ src, alt, caption, credit }) {
    return `
      <figure>
        <img src="/uploads/${src}" alt="${alt}">
        <figcaption>${caption} Photo: ${credit}</figcaption>
      </figure>
    `;
  },
})
