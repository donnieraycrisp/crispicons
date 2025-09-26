export const useIcons = () => {
  // Icon registry - you can expand this as you add more icons
  const iconRegistry = ref([
    {
      name: 'search',
      category: 'interface',
      tags: ['search', 'find', 'magnify'],
    },
    {
      name: 'zoom-in',
      category: 'interface',
      tags: ['zoom', 'magnify', 'plus'],
    },
    {
      name: 'zoom-out',
      category: 'interface',
      tags: ['zoom', 'minimize', 'minus'],
    },
  ])

  // Filter icons by category
  const getIconsByCategory = (category: string) => {
    return iconRegistry.value.filter((icon) => icon.category === category)
  }

  // Search icons by name or tags
  const searchIcons = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return iconRegistry.value.filter((icon) => {
      const name = icon.name.toLowerCase()
      const tags = icon.tags.join(' ').toLowerCase()
      return name.includes(lowercaseQuery) || tags.includes(lowercaseQuery)
    })
  }

  // Get all icons
  const getAllIcons = () => {
    return iconRegistry.value
  }

  return {
    iconRegistry,
    getIconsByCategory,
    searchIcons,
    getAllIcons,
  }
}
