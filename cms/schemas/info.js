export default {
  title: 'Info',
  name: 'info',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'blockContent',
    },
    {
      title: 'Photo',
      name: 'avatar',
      type: 'figure',
    },
    {
      title: 'Categories',
      name: 'category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare: ({ title, description }) => ({
      title,
      subtitle: description,
    }),
  },
};
