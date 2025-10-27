/**
 * SVG Helper Utilities
 * Shared utilities for analyzing and styling SVG elements
 */

/**
 * Add title and description elements to SVG for accessibility and attribution
 */
export const addSvgMetadata = (svgElement: Element, iconName: string): void => {
  // Create title element
  const titleElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'title'
  )
  titleElement.textContent = `${iconName} icon from crispicons.com`

  // Create desc element
  const descElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'desc'
  )
  descElement.textContent =
    'Free to use open-source SVG icon from the crispicons library'

  // Insert as first children of SVG
  const firstChild = svgElement.firstChild
  if (firstChild) {
    svgElement.insertBefore(descElement, firstChild)
    svgElement.insertBefore(titleElement, descElement)
  } else {
    svgElement.appendChild(titleElement)
    svgElement.appendChild(descElement)
  }
}

/**
 * Check if an SVG element or its children have stroke attributes
 */
export const hasElementsWithStroke = (svgElement: Element): boolean => {
  // Check root SVG element first
  const rootStroke = svgElement.getAttribute('stroke')
  if (rootStroke && rootStroke !== 'none' && rootStroke !== 'transparent') {
    return true
  }

  // Then check child elements
  const elements = svgElement.querySelectorAll('*')
  return Array.from(elements).some((element) => {
    const stroke = element.getAttribute('stroke')
    return stroke && stroke !== 'none' && stroke !== 'transparent'
  })
}

/**
 * Check if an SVG element or its children have fill attributes
 */
export const hasElementsWithFill = (svgElement: Element): boolean => {
  // Check root SVG element first
  const rootFill = svgElement.getAttribute('fill')
  if (rootFill && rootFill !== 'none' && rootFill !== 'transparent') {
    return true
  }

  // Then check child elements
  const elements = svgElement.querySelectorAll('*')
  return Array.from(elements).some((element) => {
    const fill = element.getAttribute('fill')
    return fill && fill !== 'none' && fill !== 'transparent'
  })
}

/**
 * Apply styling for stroke-only icons (using CSS variables for display)
 */
export const applyStrokeOnlyStyling = (svgElement: Element): void => {
  // Set stroke attributes on the root SVG
  svgElement.setAttribute('stroke', 'var(--icon-stroke)')
  svgElement.setAttribute('stroke-width', 'var(--icon-stroke-width)')
  svgElement.setAttribute('stroke-linecap', 'var(--icon-stroke-linecap)')
  svgElement.setAttribute('stroke-linejoin', 'var(--icon-stroke-linejoin)')

  // Remove hardcoded stroke attributes from child elements
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    // Ensure fill is none for stroke-only icons
    element.setAttribute('fill', 'none')
  })
}

/**
 * Apply styling for fill-only icons (using CSS variables for display)
 */
export const applyFillOnlyStyling = (svgElement: Element): void => {
  // Set fill attribute on the root SVG
  svgElement.setAttribute('fill', 'var(--icon-fill)')

  // Remove hardcoded attributes from child elements
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    // Remove hardcoded fill to inherit from parent
    element.removeAttribute('fill')
  })
}

/**
 * Apply styling for hybrid icons (using CSS variables for display)
 */
export const applyHybridStyling = (svgElement: Element): void => {
  // For hybrid icons, set stroke attributes on the root SVG
  svgElement.setAttribute('stroke', 'var(--icon-stroke)')
  svgElement.setAttribute('stroke-width', 'var(--icon-stroke-width)')
  svgElement.setAttribute('stroke-linecap', 'var(--icon-stroke-linecap)')
  svgElement.setAttribute('stroke-linejoin', 'var(--icon-stroke-linejoin)')
  // Keep root fill as "none" so only explicitly filled elements get filled
  svgElement.setAttribute('fill', 'none')

  // Apply styling to child elements based on their current attributes
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    const currentFill = element.getAttribute('fill')
    const currentStrokeWidth = element.getAttribute('stroke-width')

    // Remove stroke attributes except stroke-width for elements with stroke-width="0"
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')

    // Handle fill attribute
    if (
      currentFill &&
      currentFill !== 'none' &&
      currentFill !== 'transparent'
    ) {
      // Element has an explicit fill - replace currentColor with CSS variable
      if (currentFill === 'currentColor') {
        element.setAttribute('fill', 'var(--icon-fill)')
      }
      // If it's a specific color, leave it as is
    } else {
      // Set fill to "none" explicitly for elements that should only have stroke
      element.setAttribute('fill', 'none')
    }

    // Handle stroke-width
    if (currentStrokeWidth === '0') {
      // Keep stroke-width="0" for elements that should not have stroke
      element.setAttribute('stroke-width', '0')
    } else {
      // Remove stroke-width so it inherits from parent
      element.removeAttribute('stroke-width')
    }
  })
}

/**
 * Apply styling for stroke-only icons (for download with static color)
 */
export const applyStrokeOnlyStylingForDownload = (
  svgElement: Element,
  strokeColor: string,
  strokeWidth: number,
  strokeLinecap: string,
  strokeLinejoin: string
): void => {
  // Set stroke attributes on the root SVG
  svgElement.setAttribute('stroke', strokeColor)
  svgElement.setAttribute('stroke-width', strokeWidth.toString())
  svgElement.setAttribute('stroke-linecap', strokeLinecap)
  svgElement.setAttribute('stroke-linejoin', strokeLinejoin)

  // Remove hardcoded stroke attributes from child elements
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    // Ensure fill is none for stroke-only icons
    element.setAttribute('fill', 'none')
  })
}

/**
 * Apply styling for fill-only icons (for download with static color)
 */
export const applyFillOnlyStylingForDownload = (
  svgElement: Element,
  fillColor: string
): void => {
  // Set fill attribute on the root SVG
  svgElement.setAttribute('fill', fillColor)

  // Remove hardcoded attributes from child elements
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    // Remove hardcoded fill to inherit from parent
    element.removeAttribute('fill')
  })
}

/**
 * Apply styling for hybrid icons (for download with static colors)
 */
export const applyHybridStylingForDownload = (
  svgElement: Element,
  strokeColor: string,
  strokeWidth: number,
  strokeLinecap: string,
  strokeLinejoin: string,
  fillColor: string
): void => {
  // For hybrid icons, set stroke attributes on the root SVG
  svgElement.setAttribute('stroke', strokeColor)
  svgElement.setAttribute('stroke-width', strokeWidth.toString())
  svgElement.setAttribute('stroke-linecap', strokeLinecap)
  svgElement.setAttribute('stroke-linejoin', strokeLinejoin)
  // Keep root fill as "none" so only explicitly filled elements get filled
  svgElement.setAttribute('fill', 'none')

  // Apply styling to child elements based on their current attributes
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    const currentFill = element.getAttribute('fill')
    const currentStrokeWidth = element.getAttribute('stroke-width')

    // Remove stroke attributes except stroke-width for elements with stroke-width="0"
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')

    // Handle fill attribute
    if (
      currentFill &&
      currentFill !== 'none' &&
      currentFill !== 'transparent'
    ) {
      // Element has an explicit fill - replace currentColor with the provided fill color
      if (currentFill === 'currentColor') {
        element.setAttribute('fill', fillColor)
      }
      // If it's a specific color, leave it as is
    } else {
      // Set fill to "none" explicitly for elements that should only have stroke
      element.setAttribute('fill', 'none')
    }

    // Handle stroke-width
    if (currentStrokeWidth === '0') {
      // Keep stroke-width="0" for elements that should not have stroke
      element.setAttribute('stroke-width', '0')
    } else {
      // Remove stroke-width so it inherits from parent
      element.removeAttribute('stroke-width')
    }
  })
}
