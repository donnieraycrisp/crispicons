import type { Icon } from '~/types/icon'

export const useIcons = () => {
  // Icon registry - you can expand this as you add more icons (sorted alphabetically)
  const iconRegistry = ref<Icon[]>([
    {
      name: 'align--center',
      tags: ['align', 'center'],
    },
    {
      name: 'align--justified',
      tags: ['align', 'justified'],
    },
    {
      name: 'align--left',
      tags: ['align', 'left'],
    },
    {
      name: 'align--right',
      tags: ['align', 'right'],
    },
    {
      name: 'arrow--down',
      tags: ['arrow', 'down'],
    },
    {
      name: 'arrow--down-left',
      tags: ['arrow', 'down', 'left'],
    },
    {
      name: 'arrow--down-right',
      tags: ['arrow', 'down', 'right'],
    },
    {
      name: 'arrow--left',
      tags: ['arrow', 'left'],
    },
    {
      name: 'arrow--right',
      tags: ['arrow', 'right'],
    },
    {
      name: 'arrow--up',
      tags: ['arrow', 'up'],
    },
    {
      name: 'arrow--up-left',
      tags: ['arrow', 'up', 'left'],
    },
    {
      name: 'arrow--up-right',
      tags: ['arrow', 'up', 'right'],
    },
    {
      name: 'avatar',
      tags: ['avatar', 'user'],
    },
    {
      name: 'chevron--down',
      tags: ['chevron', 'down'],
    },
    {
      name: 'chevron--left',
      tags: ['chevron', 'left'],
    },
    {
      name: 'chevron--right',
      tags: ['chevron', 'right'],
    },
    {
      name: 'chevron--up',
      tags: ['chevron', 'up'],
    },
    {
      name: 'chevrons--down',
      tags: ['chevrons', 'down'],
    },
    {
      name: 'chevrons--left',
      tags: ['chevrons', 'left'],
    },
    {
      name: 'chevrons--right',
      tags: ['chevrons', 'right'],
    },
    {
      name: 'chevrons--up',
      tags: ['chevrons', 'up'],
    },
    {
      name: 'crypto--bitcoin',
      tags: ['crypto', 'bitcoin', 'btc'],
    },
    {
      name: 'crypto--cardano',
      tags: ['crypto', 'cardano', 'ada'],
    },
    {
      name: 'crypto--ethereum',
      tags: ['crypto', 'ethereum', 'eth'],
    },
    {
      name: 'crypto--ripple',
      tags: ['crypto', 'ripple', 'xrp'],
    },
    {
      name: 'crypto--solana',
      tags: ['crypto', 'solana', 'sol'],
    },
    {
      name: 'crypto--stellar',
      tags: ['crypto', 'stellar', 'xlm'],
    },
    {
      name: 'crypto--tether',
      tags: ['crypto', 'tether', 'usdt'],
    },
    {
      name: 'currency--dollar',
      tags: ['currency', 'dollar'],
    },
    {
      name: 'currency--euro',
      tags: ['currency', 'euro'],
    },
    {
      name: 'currency--pound',
      tags: ['currency', 'pound'],
    },
    {
      name: 'currency--rupee',
      tags: ['currency', 'rupee'],
    },
    {
      name: 'currency--yen',
      tags: ['currency', 'yen'],
    },
    {
      name: 'cursor',
      tags: ['cursor'],
    },
    {
      name: 'download',
      tags: ['download'],
    },
    {
      name: 'search',
      tags: ['search', 'find', 'magnify'],
    },
    {
      name: 'upload',
      tags: ['upload'],
    },
    {
      name: 'user',
      tags: ['user'],
    },
    {
      name: 'user--add',
      tags: ['user', 'add'],
    },
    {
      name: 'user--check',
      tags: ['user', 'check'],
    },
    {
      name: 'user--delete',
      tags: ['user', 'delete'],
    },
    {
      name: 'user--edit',
      tags: ['user', 'edit'],
    },
    {
      name: 'user--remove',
      tags: ['user', 'remove'],
    },
    {
      name: 'users',
      tags: ['users'],
    },
    {
      name: 'users--group',
      tags: ['users', 'group'],
    },
    {
      name: 'zoom--in',
      tags: ['zoom', 'magnify', 'plus'],
    },
    {
      name: 'zoom--out',
      tags: ['zoom', 'minimize', 'minus'],
    },
  ])

  // Get icon count
  const iconCount = computed(() => iconRegistry.value.length)

  // Search icons by name or tags
  const searchIcons = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return iconRegistry.value.filter((icon) => {
      const name = icon.name.toLowerCase()
      const tags = icon.tags.join(' ').toLowerCase()
      return name.includes(lowercaseQuery) || tags.includes(lowercaseQuery)
    })
  }

  // Get all icons (sorted alphabetically)
  const getAllIcons = () => {
    return iconRegistry.value.sort((a, b) => a.name.localeCompare(b.name))
  }

  return {
    iconRegistry,
    iconCount,
    searchIcons,
    getAllIcons,
  }
}
