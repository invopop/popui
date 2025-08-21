document.addEventListener('alpine:init', () => {
  window.Alpine.store('contenteditable', {
    savedSelection: null,
    variables: [],

    saveSelection() {
      const selection = window.getSelection()
      if (selection.rangeCount) {
        this.savedSelection = selection.getRangeAt(0)
      } else {
        this.savedSelection = null
      }
    },

    restoreSelection() {
      if (!this.savedSelection) return

      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(this.savedSelection)
    },

    async focusTextarea(textarea) {
      this.saveSelection()
      await window.Alpine.nextTick()
      textarea.focus()
      this.restoreSelection()
    },

    async handleMessageInput(textarea) {
      const rawText = textarea.innerHTML

      const parsedText = rawText
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00a0/g, ' ')
        .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '\n$1')
        .replace(/<br[^>]*>/g, '\n')
        .replace(/<span class="tag" contenteditable="false">(.*?)<\/span>/g, (_, label) => {
          const variable = this.variables.find((v) => v.label === label)
          return variable.value || label
        })
        .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1')

      const message = parsedText

      // If tag has been introduced manually we need to refresh the content
      if (rawText.match(/\{\{\.([^}]+?)\}\}/g)) {
        // TODO: Selection is restored to a wrong point because after new parsing
        // there are different nodes and offsets does not match
        // we need to find a hack for this.
        this.saveSelection()
        textarea.innerHTML = this.parseMessage(parsedText)
        this.restoreSelection()
      }

      return message
    },

    parseMessage(message) {
      return message.replace(/\n/g, '<br>').replace(/\{\{\.(.*?)\}\}/g, (_, value) => {
        const variable = this.variables.find((v) => v.value === `{{.${value}}}`)
        return variable
          ? `<span class="tag" contenteditable="false">${variable.label}</span>`
          : `{{.${value}}}`
      })
    },

    async insertVariable(textarea, variable) {
      await this.focusTextarea(textarea)

      // If saved selection is part of the textarea
      if (this.savedSelection && textarea.contains(this.savedSelection.commonAncestorContainer)) {
        this.restoreSelection()
      } else {
        // If not we set the cursor to the end of the textarea
        const range = document.createRange()
        const selection = window.getSelection()
        range.setStart(textarea, textarea.childNodes.length)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      }

      // We replace the current selection with the new variable
      const sel = window.getSelection()
      const rang = sel.getRangeAt(0)
      rang.deleteContents()
      var textNode = document.createElement('span')
      textNode.innerText = variable.label
      textNode.classList.add('tag')
      textNode.setAttribute('contenteditable', false)
      rang.insertNode(textNode)
      // Set the cursor right next to the new tag
      rang.collapse(false)
      sel.removeAllRanges()
      sel.addRange(rang)

      // We update the parsed message
      return await this.handleMessageInput(textarea)
    }
  })
})

// Revove format from pasted text
document.addEventListener('paste', function (e) {
  const target = e.target

  // Only run if the target is a contenteditable element
  if (target && target.isContentEditable) {
    e.preventDefault()
    let clipboardEvent = e

    if (!clipboardEvent.clipboardData) return

    const target = e.target

    if (!target) return

    const pasteText = clipboardEvent.clipboardData.getData('text/plain')
    const selection = window.getSelection()

    if (!selection || !selection.rangeCount) return

    const range = selection.getRangeAt(0)
    range.deleteContents()
    const textNode = document.createTextNode(pasteText)
    range.insertNode(textNode)
    range.setStartAfter(textNode)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }
})
