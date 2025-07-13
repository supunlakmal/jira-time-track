/**
 *  Pass ID of Element to Dismiss
 * @param eleId 
 */
const handleDismiss = (eleId: string) => {
  const element = document.getElementById(eleId)
  element?.classList.add('hidden')
}

export default handleDismiss