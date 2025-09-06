import type { CollectionConfig } from 'payload'

export const HeroBanner: CollectionConfig = {
  slug: 'hero-banner',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      defaultValue: 'Premium supplements to fuel your fitness journey and enhance your well-being with science-backed nutrition.',
    },
    {
      name: 'ctaText',
      type: 'text',
      required: false,
      defaultValue: 'Explore Now',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: false,
      defaultValue: '/products',
    },
    {
      name: 'desktopImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}