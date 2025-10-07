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
  // Set both stroke and fill attributes on the root SVG
  svgElement.setAttribute('stroke', 'var(--icon-stroke)')
  svgElement.setAttribute('stroke-width', 'var(--icon-stroke-width)')
  svgElement.setAttribute('stroke-linecap', 'var(--icon-stroke-linecap)')
  svgElement.setAttribute('stroke-linejoin', 'var(--icon-stroke-linejoin)')
  svgElement.setAttribute('fill', 'var(--icon-fill)')

  // Remove hardcoded attributes from child elements to inherit from parent
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    element.removeAttribute('fill')
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
  // Set both stroke and fill attributes on the root SVG
  svgElement.setAttribute('stroke', strokeColor)
  svgElement.setAttribute('stroke-width', strokeWidth.toString())
  svgElement.setAttribute('stroke-linecap', strokeLinecap)
  svgElement.setAttribute('stroke-linejoin', strokeLinejoin)
  svgElement.setAttribute('fill', fillColor)

  // Remove hardcoded attributes from child elements to inherit from parent
  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    element.removeAttribute('stroke')
    element.removeAttribute('stroke-width')
    element.removeAttribute('stroke-linecap')
    element.removeAttribute('stroke-linejoin')
    element.removeAttribute('fill')
  })
}
