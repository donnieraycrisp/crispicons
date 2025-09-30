export const useIcons = () => {
  // Icon registry - you can expand this as you add more icons
  const iconRegistry = ref([
    {
      name: 'arrow-up',
      category: 'interface',
      tags: ['arrow', 'down'],
    },
    {
      name: 'arrow-up-right',
      category: 'interface',
      tags: ['arrow', 'up', 'right'],
    },
    {
      name: 'arrow-right',
      category: 'interface',
      tags: ['arrow', 'right'],
    },
    {
      name: 'arrow-down-right',
      category: 'interface',
      tags: ['arrow', 'down', 'right'],
    },
    {
      name: 'arrow-down',
      category: 'interface',
      tags: ['arrow', 'down'],
    },
    {
      name: 'arrow-down-left',
      category: 'interface',
      tags: ['arrow', 'down', 'left'],
    },
    {
      name: 'arrow-left',
      category: 'interface',
      tags: ['arrow', 'left'],
    },
    {
      name: 'arrow-up-left',
      category: 'interface',
      tags: ['arrow', 'up', 'left'],
    },
    {
      name: 'chevron-up',
      category: 'interface',
      tags: ['chevron', 'up'],
    },
    {
      name: 'chevron-right',
      category: 'interface',
      tags: ['chevron', 'right'],
    },
    {
      name: 'chevron-down',
      category: 'interface',
      tags: ['chevron', 'down'],
    },
    {
      name: 'chevron-left',
      category: 'interface',
      tags: ['chevron', 'left'],
    },
    {
      name: 'chevrons-up',
      category: 'interface',
      tags: ['chevrons', 'up'],
    },
    {
      name: 'chevrons-right',
      category: 'interface',
      tags: ['chevrons', 'right'],
    },
    {
      name: 'chevrons-down',
      category: 'interface',
      tags: ['chevrons', 'down'],
    },
    {
      name: 'chevrons-left',
      category: 'interface',
      tags: ['chevrons', 'left'],
    },
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

  // Get icon count
  const iconCount = computed(() => iconRegistry.value.length)

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
    iconCount,
    getIconsByCategory,
    searchIcons,
    getAllIcons,
  }
}
