// copied from https://github.com/ipfs/ipfs-companion/pull/1078/files
// TODO: clean up
export default async function copyTextToClipboard (text) {
  try {
    try {
      // Modern API (spotty support, but works in Firefox)
      await navigator.clipboard.writeText(text)
      // FUN FACT:
      // Before this API existed we had no access to clipboard from
      // the background page in Firefox and had to inject content script
      // into current page to copy there:
      // https://github.com/ipfs-shipyard/ipfs-companion/blob/b4a168880df95718e15e57dace6d5006d58e7f30/add-on/src/lib/copier.js#L10-L35
      // :-))
    } catch (e) {
      // Fallback to old API (works only in Chromium)
      // TODO replace this long type definition
      function oncopy (event) {
        document.removeEventListener('copy', oncopy, true)
        event.stopImmediatePropagation()
        event.preventDefault()
        event.clipboardData.setData('text/plain', text)
      }
      document.addEventListener('copy', oncopy, true)
      document.execCommand('copy')
    }
    // notify("notify_copiedTitle", text);
  } catch (error) {
    console.error('[pin-tweet-to-ipfs] Failed to copy text', error)
    // notify("notify_addonIssueTitle", "Unable to copy");
  }
}
